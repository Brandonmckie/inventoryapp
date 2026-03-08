import { createClient } from "@/utils/supabase/server";
import { MarketingNav } from "@/components/layout/MarketingNav";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Activity, Zap, CheckCircle2, ScanLine } from "lucide-react";
import Link from "next/link";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#060a12] text-zinc-100 flex flex-col selection:bg-teal-500/30">
      <MarketingNav user={user} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-36 md:pb-48">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/20 to-transparent blur-3xl rounded-full" />
          </div>

          <div className="container mx-auto max-w-6xl px-4 relative z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-300 mb-8 backdrop-blur-sm">
              <Zap className="mr-2 h-4 w-4" />
              Recurra 1.0 is now live
            </div>
            <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 mb-8 leading-tight">
              Optical inventory management, <br className="hidden md:block" /> perfectly focused.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
              Ditch the archaic legacy systems. Recurra brings modern speed, intuitive design, and seamless stock tracking to your independent optical practice.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href={user ? "/dashboard" : "/register"}>
                <Button size="lg" className="h-12 px-8 bg-white text-zinc-900 hover:bg-zinc-200 font-medium text-base rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                  {user ? "Go to Dashboard" : "Start your free trial"}
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="h-12 px-8 border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 rounded-full backdrop-blur-sm hover:text-white transition-colors hover:border-zinc-500">
                  Explore features <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="py-24 bg-[#04070d] border-y border-zinc-800/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16 md:text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Everything you need to run your dispensary.
              </h2>
              <p className="text-zinc-400 text-lg">
                Built specifically for optical practices, we handle the complexity of frames, contacts, and accessories so you can focus on patient care.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl transition-colors hover:bg-zinc-900/60 group">
                <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Box className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Intelligent Catalog</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Easily categorize your inventory into frames, contacts, and accessories with infinite custom attributes for brands and sizing.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl transition-colors hover:bg-zinc-900/60 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full" />
                <div className="h-12 w-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 border border-teal-500/20 relative z-10 group-hover:bg-teal-500/20 transition-colors">
                  <Activity className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Real-time Adjustments</h3>
                <p className="text-zinc-400 leading-relaxed relative z-10">
                  Track every dispense, restock, or manual adjustment with an immutable ledger. Never lose sight of where your frames went.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl transition-colors hover:bg-zinc-900/60 group">
                <div className="h-12 w-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                  <ScanLine className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Barcode Ready</h3>
                <p className="text-zinc-400 leading-relaxed">
                  Generate, print, and scan barcodes directly from the app. Radically speed up physical inventory counts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#04070d] to-[#060a12]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-teal-500 to-transparent blur-3xl opacity-50" />
          </div>
          <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to modernize your inventory?
            </h2>
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
              Join the growing list of independent opticals saving hours a week with Recurra. No credit card required to start.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={user ? "/dashboard" : "/register"}>
                <Button size="lg" className="h-12 px-8 bg-teal-500 hover:bg-teal-600 text-white font-medium text-base rounded-full shadow-lg shadow-teal-500/20">
                  {user ? "Go to Dashboard" : "Get started for free"}
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-500" /> 14-day free trial</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-500" /> No setup fees</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-500" /> Cancel anytime</span>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
