/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS is required by this isolated Node/VM test harness. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const sdk = require('node-appwrite');
const root = path.resolve(__dirname, '..');
const plain = value => JSON.parse(JSON.stringify(value));

function fixture() {
  const state = { rows: new Map(), writes: [], creates: [], reads: [], deletes: [], authDeletes: [], tokens: [], adminClients: 0, jwtCreates: 0, browserUser: 'user-a', authError: null, readError: null, createRace: false, deleteError: false };
  const users = {
    'user-a': { $id: 'user-a', email: 'a@example.test', name: 'Alice', status: true },
    'user-b': { $id: 'user-b', email: 'b@example.test', name: 'Bob', status: true },
  };
  const seed = (collection, id, data) => { const doc = { $id: id, ...data }; state.rows.set(collection + '/' + id, doc); return doc; };
  const base = { name: 'Alice', isTeacher: false, isSubscribed: false, dictionaryWords: ['coffee::A hot drink.'], recentConversations: [], completeConversations: [], customColors: [], taskCount: 0, streak: 0, guideTour: [], stripeCustomerId: 'private-customer-id' };
  seed('users', 'user-a', { ...base }); seed('users', 'user-b', { ...base, name: 'Bob', dictionaryWords: ['other::Private word.'] });
  seed('conversations', 'conversation-1', { audioFileId: 'audio-1' });
  const databases = {
    async getDocument(input) {
      state.reads.push(plain(input));
      if (state.readError) throw { code: state.readError, message: 'sensitive SDK details' };
      const doc = state.rows.get(input.collectionId + '/' + input.documentId);
      if (!doc) throw { code: 404 };
      return { ...doc };
    },
    async createDocument(input) {
      state.creates.push(plain(input));
      const key = input.collectionId + '/' + input.documentId;
      if (state.createRace) { state.createRace = false; seed(input.collectionId, input.documentId, { ...base, dictionaryWords: ['raced::Preserved.'] }); throw { code: 409 }; }
      if (state.rows.has(key)) throw { code: 409 };
      return seed(input.collectionId, input.documentId, { ...input.data, $permissions: input.permissions });
    },
    async updateDocument(input) {
      state.writes.push(plain(input));
      const key = input.collectionId + '/' + input.documentId;
      const updated = { ...state.rows.get(key), ...input.data };
      state.rows.set(key, updated); return updated;
    },
    async listDocuments(input) {
      let rows = [...state.rows.entries()].filter(([key]) => key.startsWith(input.collectionId + '/')).map(([, row]) => row).sort((a,b) => a.$id.localeCompare(b.$id));
      let limit = 25;
      for (const raw of input.queries || []) {
        const q = JSON.parse(raw);
        if (q.method === 'equal') rows = rows.filter(row => q.values.includes(row[q.attribute]));
        if (q.method === 'cursorAfter') { const index = rows.findIndex(row => row.$id === q.values[0]); rows = rows.slice(index + 1); }
        if (q.method === 'limit') limit = q.values[0];
      }
      return { total: rows.length, documents: rows.slice(0, limit) };
    },
    async deleteDocument(input) { if (state.deleteError) throw { code: 500, message: 'secret error' }; state.deletes.push(plain(input)); state.rows.delete(input.collectionId + '/' + input.documentId); },
  };
  class Client { setEndpoint() { return this; } setProject() { return this; } setJWT(jwt) { this.jwt = jwt; return this; } setKey() { state.adminClients++; return this; } }
  class Account { constructor(client) { this.client = client; } async get() { if (state.authError) throw { code: state.authError }; const user = this.client.jwt === 'jwt-a' ? users['user-a'] : this.client.jwt === 'jwt-b' ? users['user-b'] : null; if (!user) throw { code: 401 }; return user; } }
  class Databases { constructor() { return databases; } }
  class Users { async delete(input) { state.authDeletes.push(plain(input)); } }
  class Tokens { async createFileToken(input) { state.tokens.push(plain(input)); return { secret: 'temporary-file-secret' }; } }
  const browserAccount = { async get() { if (!state.browserUser) throw { code: 401 }; return users[state.browserUser]; }, async createJWT() { state.jwtCreates++; return { jwt: state.browserUser === 'user-a' ? 'jwt-a' : 'jwt-b' }; } };
  const env = { APPWRITE_ENDPOINT: 'https://example.test/v1', APPWRITE_PROJECT_ID: 'project', APPWRITE_DATABASE_ID: 'db', APPWRITE_USERS_COLLECTION_ID: 'users', APPWRITE_CONVERSATIONS_COLLECTION_ID: 'conversations', APPWRITE_DECKS_COLLECTION_ID: 'decks', APPWRITE_FEEDBACK_COLLECTION_ID: 'feedback', APPWRITE_AUDIO_BUCKET_ID: 'audio', APPWRITE_FRIEND_REQUESTS_ID: 'friends', APPWRITE_ASSIGNMENTS_ID: 'assignments', APPWRITE_API_KEY: 'test-server-only-key' };
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (cache.has(file)) return cache.get(file).exports;
    const loadedModule = { exports: {} }; cache.set(file, loadedModule);
    const source = fs.readFileSync(file, 'utf8');
    const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const localRequire = id => {
      if (id === 'server-only') return {};
      if (id === 'node-appwrite') return { ...sdk, Client, Account, Databases, Users, Tokens };
      if (id === '@/data/appwrite') return { account: browserAccount };
      if (id.startsWith('@/')) return load('src/' + id.slice(2) + '.ts');
      if (id.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(file), id + '.ts')));
      return require(id);
    };
    vm.runInNewContext(code, { module: loadedModule, exports: loadedModule.exports, require: localRequire, process: { env }, console, URL, Request, Response, Intl, Date, setTimeout, clearTimeout }, { filename: file });
    return loadedModule.exports;
  }
  return { state, seed, load, users, actions: load('src/app/actions/account.ts') };
}

test('unauthenticated and forged tokens cannot construct a privileged client or write', async () => {
  for (const token of ['', 'forged', null]) {
    const f = fixture();
    const result = await f.actions.updateProfileAction(token, { kind: 'task.complete' });
    assert.equal(result.status, 401); assert.equal(f.state.adminClients, 0); assert.equal(f.state.writes.length, 0);
  }
});

test('disabled users and authentication service failures fail closed', async () => {
  const f = fixture(); f.users['user-a'].status = false;
  assert.equal((await f.actions.getProfileAction('jwt-a')).status, 401);
  f.users['user-a'].status = true; f.state.authError = 500;
  const result = await f.actions.getProfileAction('jwt-a');
  assert.equal(result.status, 503); assert.equal(f.state.adminClients, 0); assert.ok(!JSON.stringify(result).includes('sensitive'));
});

test('profile reads target the verified identity and omit billing identifiers', async () => {
  const f = fixture(); const result = await f.actions.getProfileAction('jwt-b');
  assert.equal(result.ok, true); assert.equal(result.data.document.$id, 'user-b');
  assert.equal(result.data.document.dictionaryWords[0], 'other::Private word.');
  assert.equal('stripeCustomerId' in result.data.document, false); assert.equal('$permissions' in result.data.document, false);
  assert.equal(f.state.creates.length, 0);
});

test('new profiles get server defaults and owner-read permissions; creation races preserve data', async () => {
  const f = fixture(); f.state.rows.delete('users/user-a');
  const result = await f.actions.getProfileAction('jwt-a');
  assert.equal(result.data.created, true);
  assert.equal(f.state.creates[0].data.isTeacher, true); assert.equal(f.state.creates[0].data.isSubscribed, false);
  assert.equal(f.state.creates[0].data.onboardingComplete, true);
  assert.deepEqual(f.state.creates[0].permissions, ['read("user:user-a")']);
  const raced = fixture(); raced.state.rows.delete('users/user-a'); raced.state.createRace = true;
  const second = await raced.actions.getProfileAction('jwt-a');
  assert.equal(second.data.created, false); assert.equal(second.data.document.dictionaryWords[0], 'raced::Preserved.');
});

test('profile backend errors do not trigger replacement creation or disclose SDK internals', async () => {
  const f = fixture(); f.state.readError = 403;
  const result = await f.actions.getProfileAction('jwt-a');
  assert.equal(result.ok, false); assert.equal(f.state.creates.length, 0); assert.ok(!JSON.stringify(result).includes('sensitive SDK'));
});

test('profile operations reject ownership, permission and subscription injection', async () => {
  const f = fixture();
  for (const input of [
    { kind: 'task.complete', isSubscribed: true }, { kind: 'task.complete', userId: 'user-b' },
    { kind: 'task.complete', role: 'admin' }, { kind: 'task.complete', $permissions: ['read("any")'] },
    { kind: 'subscription.save', value: true }, null,
  ]) { const result = await f.actions.updateProfileAction('jwt-a', input); assert.equal(result.status, 400); }
  assert.equal(f.state.writes.length, 0); assert.equal(f.state.rows.get('users/user-a').isSubscribed, false);
});

test('dictionary additions merge and deduplicate while removals preserve other entries', async () => {
  const f = fixture();
  await f.actions.updateProfileAction('jwt-a', { kind: 'dictionary.add', entry: 'team::People working together.' });
  await f.actions.updateProfileAction('jwt-a', { kind: 'dictionary.add', entry: 'team::People working together.' });
  let doc = f.state.rows.get('users/user-a'); assert.equal(doc.dictionaryWords.length, 2);
  await f.actions.updateProfileAction('jwt-a', { kind: 'dictionary.remove', entry: 'coffee::A hot drink.' });
  doc = f.state.rows.get('users/user-a'); assert.deepEqual(plain(doc.dictionaryWords), ['team::People working together.']);
  assert.equal(f.state.rows.get('users/user-b').dictionaryWords.length, 1);
  assert.ok(f.state.writes.every(write => write.documentId === 'user-a' && Object.keys(write.data).length === 1));
  assert.equal((await f.actions.updateProfileAction('jwt-a', { kind: 'dictionary.add', entry: 'word::' })).status, 400);
});

test('colors are restricted to the thirteen existing word types and known Tailwind colors', async () => {
  const f = fixture();
  assert.equal((await f.actions.updateProfileAction('jwt-a', { kind: 'colors.save', colors: ['red500'] })).status, 400);
  assert.equal((await f.actions.updateProfileAction('jwt-a', { kind: 'colors.save', colors: Array(13).fill('invalid-color') })).status, 400);
  assert.equal((await f.actions.updateProfileAction('jwt-a', { kind: 'colors.save', colors: Array(13).fill('blue500') })).ok, true);
});

test('recents stay unique and bounded; completing a nonexistent conversation does not write', async () => {
  const f = fixture();
  for (let i=1;i<=7;i++) { f.seed('conversations','c-'+i,{audioFileId:'audio-1'}); await f.actions.updateProfileAction('jwt-a',{kind:'conversation.open',conversationId:'c-'+i}); }
  await f.actions.updateProfileAction('jwt-a',{kind:'conversation.open',conversationId:'c-4'});
  const recents = f.state.rows.get('users/user-a').recentConversations;
  assert.equal(recents.length, 5); assert.equal(recents[0], 'c-4'); assert.equal(new Set(recents).size, 5);
  const before = f.state.writes.length;
  assert.equal((await f.actions.updateProfileAction('jwt-a',{kind:'conversation.complete',conversationId:'missing'})).ok, false);
  assert.equal(f.state.writes.length, before);
  await f.actions.updateProfileAction('jwt-a',{kind:'conversation.complete',conversationId:'conversation-1'});
  await f.actions.updateProfileAction('jwt-a',{kind:'conversation.complete',conversationId:'conversation-1'});
  assert.equal(f.state.rows.get('users/user-a').completeConversations.length, 1);
});

test('profile names come from verified Appwrite auth; challenge awards are checked on server', async () => {
  const f = fixture();
  await f.actions.updateProfileAction('jwt-a',{kind:'profile.syncName'});
  assert.equal(f.state.writes[0].data.name, 'Alice');
  assert.equal((await f.actions.updateProfileAction('jwt-a',{kind:'challenge.complete',challengeId:'save-50-dictionary-words'})).status,400);
  await f.actions.updateProfileAction('jwt-a',{kind:'streak.touch',timeZone:'Europe/Athens'});
  await f.actions.updateProfileAction('jwt-a',{kind:'streak.touch',timeZone:'Europe/Athens'});
  assert.equal(f.state.rows.get('users/user-a').streak,1);
});

test('deck listing is owner-scoped, paginated, and foreign deletion is rejected', async () => {
  const f = fixture();
  for(let i=0;i<105;i++) f.seed('decks','deck-'+String(i).padStart(3,'0'),{title:'Deck',type:'flashcards',words:[],userID:'user-a'});
  f.seed('decks','foreign',{title:'Private',type:'flashcards',words:[],userID:'user-b'});
  const result = await f.actions.listDecksAction('jwt-a'); assert.equal(result.data.length,105);
  assert.equal((await f.actions.deleteDeckAction('jwt-a','foreign')).status,403); assert.equal(f.state.deletes.length,0);
  assert.equal((await f.actions.createDeckAction('jwt-a',{name:'My deck',type:'flashcards',words:['Coffee::a hot drink.']})).ok,true);
  assert.equal(f.state.creates[0].data.userID,'user-a'); assert.deepEqual(f.state.creates[0].permissions,['read("user:user-a")']);
  assert.equal((await f.actions.createDeckAction('jwt-a',{name:'Invalid',type:'flashcards',words:['not-saved::Other.']})).status,400);
});

test('Free users cannot mint audio access, even with a tutor flag; Plus uses trusted file ID and expiration', async () => {
  const f = fixture(); f.state.rows.get('users/user-a').isTeacher=true;
  assert.equal((await f.actions.audioAccessAction('jwt-a','conversation-1')).status,403); assert.equal(f.state.tokens.length,0);
  f.state.rows.get('users/user-a').isSubscribed=true;
  const result = await f.actions.audioAccessAction('jwt-a','conversation-1');
  assert.equal(result.ok,true); assert.equal(f.state.tokens[0].fileId,'audio-1');
  const expires = Date.parse(f.state.tokens[0].expire); assert.ok(expires>Date.now() && expires<=Date.now()+600001);
  const url = new URL(result.data.url); assert.equal(url.searchParams.get('token'),'temporary-file-secret');
  assert.equal((await f.actions.audioAccessAction('jwt-a','https://attacker.test')).status,400);
});

test('deletion route rejects missing credentials and foreign user IDs', async () => {
  const f=fixture(); const route=f.load('src/app/api/delete-account/route.ts');
  const req=(body,authorization)=>new Request('https://example.test/api/delete-account',{method:'POST',headers:{'content-type':'application/json',...(authorization?{authorization}: {})},body:JSON.stringify(body)});
  assert.equal((await route.POST(req({userId:'user-a'}))).status,401);
  assert.equal((await route.POST(req({userId:'user-b'},'Bearer jwt-a'))).status,403);
  assert.equal(f.state.authDeletes.length,0); assert.equal(f.state.deletes.length,0);
});

test('self-deletion cleans all pages of owned data and fails visibly on backend errors', async () => {
  const f=fixture(); const route=f.load('src/app/api/delete-account/route.ts');
  for(let i=0;i<110;i++) f.seed('decks','owned-'+i,{userID:'user-a'});
  f.seed('decks','foreign',{userID:'user-b'});
  const req=()=>new Request('https://example.test/api/delete-account',{method:'POST',headers:{authorization:'Bearer jwt-a','content-type':'application/json'},body:JSON.stringify({userId:'user-a'})});
  const response=await route.POST(req()); assert.equal(response.status,200); assert.equal(f.state.rows.has('decks/foreign'),true);
  assert.equal(f.state.rows.has('users/user-b'),true); assert.deepEqual(f.state.authDeletes,[{userId:'user-a'}]);
  const fail=fixture(); fail.state.deleteError=true;
  const failed=await fail.load('src/app/api/delete-account/route.ts').POST(req());
  assert.equal(failed.status,500); assert.equal(fail.state.authDeletes.length,0); assert.ok(!(await failed.text()).includes('secret error'));
});

test('client adapter serializes rapid edits, reuses credentials, and handles account switches', async () => {
  const f=fixture(); const client=f.load('src/data/accountActions.ts');
  await Promise.all(['one','two','three'].map(word=>client.updateMyProfile({kind:'dictionary.add',entry:word+'::Definition.'})));
  assert.equal(f.state.rows.get('users/user-a').dictionaryWords.length,4); assert.equal(f.state.jwtCreates,1);
  f.state.browserUser='user-b'; const result=await client.getMyProfile();
  assert.equal(result.document.$id,'user-b'); assert.equal(f.state.jwtCreates,2);
  f.state.browserUser=null; await assert.rejects(client.getMyProfile());
});


test('feedback is validated and private; unsupported fields cannot be stored', async () => {
  const f=fixture();
  assert.equal((await f.actions.feedbackAction('jwt-a',{tag:'bug',feedback:'Problem',isSubscribed:true})).status,400);
  assert.equal((await f.actions.feedbackAction('jwt-a',{tag:'bug',feedback:'x'.repeat(1001)})).status,400);
  assert.equal((await f.actions.feedbackAction('jwt-a',{tag:'bug',feedback:'Audio issue',name:'Alice',email:'a@example.test'})).ok,true);
  assert.equal(f.state.creates[0].collectionId,'feedback');
  assert.deepEqual(f.state.creates[0].permissions,[]);
});


test('queued edits cannot cross into a newly signed-in account', async () => {
  const f=fixture(); const client=f.load('src/data/accountActions.ts');
  const pending=client.updateMyProfile({kind:'dictionary.add',entry:'queued::Private to Alice.'});
  f.state.browserUser='user-b';
  await assert.rejects(pending,/account changed/);
  assert.deepEqual(plain(f.state.rows.get('users/user-b').dictionaryWords),['other::Private word.']);
  assert.equal(f.state.writes.length,0);
});
