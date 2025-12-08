import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { useUserStore } from '@/data/useUserStore'
import React from 'react'

function Enterprise() {
  const { user, isSubscribed } = useUserStore();

  return (
    <div>
      <Card className="border-none bg-background shadow-none">

        <CardHeader>
          <CardTitle className="flex justify-center text-lg">
            Custom pricing
          </CardTitle>
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col justify-between p-4 border rounded-xl w-full max-w-md min-h-[260px] text-muted-foreground">

              <div className="flex flex-col items-center flex-grow">
                <Badge className="mb-8 bg-blue-300 text-black">Custom</Badge>

                <ul className="text-base list-disc marker:text-blue-300 space-y-1">
                  <li>Designed for tens or hundreds of students</li>
                  <li>Bulk seats</li>
                  <li>Admin dashboard</li>
                </ul>
              </div>

              {isSubscribed ? (
                <Button variant="outline" disabled className="w-full opacity-50">
                  Subscribed
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="w-full cursor-pointer"
                  disabled
                >
                  Contact me
                </Button>
              )}
            </div>
          </motion.div>
        </CardContent>

      </Card>
    </div>
  );
}

export default Enterprise;
