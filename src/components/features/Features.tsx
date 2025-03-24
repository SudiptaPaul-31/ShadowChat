import { Shield, Users, Lock, Vote, Zap, MessageSquare } from "lucide-react";

const Features = () => {
  return (
    <section>
      <div className="container space-y-12 mx-auto px-4">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Key Features
          </h2>
          <p className="text-muted-foreground text-lg">
            ShadowChat combines cutting-edge technology with user-friendly
            design to provide a secure and private communication platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                <Shield className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold">Anonymous Profiles</h3>
              <p className="text-muted-foreground">
                Engage with the platform without linking your real-world
                identity, maintaining complete privacy.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <MessageSquare className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold">Encrypted Messaging</h3>
              <p className="text-muted-foreground">
                End-to-end encryption ensures your conversations remain private
                and unreadable to third parties.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                <Users className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold">Private Communities</h3>
              <p className="text-muted-foreground">
                Create and join chat groups with like-minded individuals, all
                while maintaining anonymity.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <Lock className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold">
                Zero-Knowledge Authentication
              </h3>
              <p className="text-muted-foreground">
                Verify your identity without revealing personal information
                through advanced cryptographic techniques.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                <Vote className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold">On-Chain Governance</h3>
              <p className="text-muted-foreground">
                Implement smart contract-based rules and democratic voting
                mechanisms within communities.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-md transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative space-y-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold">Starknet Integration</h3>
              <p className="text-muted-foreground">
                Fast and low-cost transactions powered by Starknet&apos;s Layer
                2 scalability solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
