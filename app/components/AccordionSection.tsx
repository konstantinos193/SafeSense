"use client"

import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AccordionSectionProps {
  title: string
  description: string
  items: string[]
  color: string
  insuranceTitle: string
}

export function AccordionSection({ title, description, items, color, insuranceTitle }: AccordionSectionProps) {
  return (
    <AccordionItem value={title.toLowerCase().replace(/ /g, '-')}>
      <AccordionTrigger className="text-xl font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${color} text-white shrink-0`}
                  >
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/get-coverage">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
      </AccordionContent>
    </AccordionItem>
  )
} 