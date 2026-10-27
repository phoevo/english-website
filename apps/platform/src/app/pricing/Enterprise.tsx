import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { useUserStore } from '@/data/useUserStore'
import React from 'react'

function Enterprise() {
  useUserStore();

  return (
    <div>
      <Card className="border-none bg-background shadow-none">

        <CardHeader>
          <CardTitle className="flex justify-center text-2xl">Custom pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col justify-between p-2 border rounded-xl w-full h-100 shadow-md w-xs md:w-xl text-muted-foreground">

              <div className="flex flex-col items-center flex-grow">
                <Badge className="mb-8 bg-blue-300 text-background">Enterprise</Badge>

                <ul className="text-base list-disc marker:text-blue-300 space-y-1 text-wrap px-4">
                  <li>Designed for tens or hundreds of students</li>
                  <li>Bulk seats</li>
                  <li>Admin dashboard</li>
                </ul>
              </div>

                <Button
                  variant="secondary"
                  className="w-1/2 self-center text-background cursor-pointer bg-blue-300 hover:bg-blue-300/80">
                  Contact me
                </Button>

            </div>
          </motion.div>
        </CardContent>

      </Card>
    </div>
  );
}

export default Enterprise;
