// components/CTASection.tsx
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl border bg-card p-8 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-background" />
          <div className="relative flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Ready to Experience the Future of Private Communication?
              </h2>
              <p className="text-muted-foreground">
                Join our waitlist to be among the first to access ShadowChat
                when we launch.
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-700 hover:from-indigo-600 hover:to-purple-800 shadow-md min-w-36 dark:text-white"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
