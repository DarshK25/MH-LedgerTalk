'use client';

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Circle, FileText, Shield, BarChart3, Brain, Bell, Zap, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pb-24 pt-16">
        {/* Background gradient - GREEN */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl" />

        {/* Animated shapes with GREEN gradients */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { width: 600, height: 140, rotate: 12, gradient: "from-primary/20 to-accent/10", top: "20%", left: "-10%" },
            { width: 500, height: 120, rotate: -15, gradient: "from-accent/15 to-primary/10", top: "70%", right: "-5%" },
            { width: 300, height: 80, rotate: -8, gradient: "from-primary/25 to-transparent", bottom: "10%", left: "10%" },
            { width: 200, height: 60, rotate: 20, gradient: "from-accent/20 to-transparent", top: "15%", right: "20%" },
          ].map((shape, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -150, rotate: shape.rotate - 15 }}
              animate={{ opacity: 1, y: 0, rotate: shape.rotate }}
              transition={{ duration: 2.4, delay: 0.3 + i * 0.1, ease: [0.23, 0.86, 0.39, 0.96] }}
              className="absolute"
              style={{ ...Object.fromEntries(Object.entries(shape).filter(([k]) => ['top', 'bottom', 'left', 'right'].includes(k))) }}
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: shape.width, height: shape.height }}
                className="relative"
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${shape.gradient} backdrop-blur-[2px] border-2 border-primary/20 shadow-lg shadow-primary/5`} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 mb-8"
            >
              <Circle className="h-2 w-2 fill-primary text-primary animate-pulse" />
              <span className="text-sm text-primary font-medium tracking-wide">
                AI-Powered Finance
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                  Your Intelligent
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-gradient ]">
                  Financial Companion
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Simplify your money, understand your spending, and automate your finances with AI. Built specifically for Indian businesses with GST, TDS, and compliance automation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/dashboard">
                <Button size="lg" className="font-semibold px-8 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/bank-statement-classifier">
                <Button size="lg" variant="outline" className="font-semibold px-8 border-primary/30 hover:bg-primary/10">
                  Try Classifier
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 pb-32 bg-background relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose LedgerTalk?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Intelligent tools designed to make financial management effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Smart Tracking",
                description: "Automatically categorize and track your transactions with AI-powered insights",
                delay: 0.1,
                color: "text-primary",
                bgColor: "bg-primary/10"
              },
              {
                icon: BarChart3,
                title: "Visual Analytics",
                description: "Beautiful charts and graphs that make understanding your finances intuitive",
                delay: 0.2,
                color: "text-accent",
                bgColor: "bg-accent/10"
              },
              {
                icon: Brain,
                title: "AI Assistant",
                description: "Chat with LedgerTalk AI to get personalized financial advice anytime",
                delay: 0.3,
                color: "text-primary",
                bgColor: "bg-primary/10"
              },
              {
                icon: Shield,
                title: "GST Compliance",
                description: "Automated GST calculations and return filing assistance for GSTR-1, GSTR-3B",
                delay: 0.4,
                color: "text-success",
                bgColor: "bg-success/10"
              },
              {
                icon: Bell,
                title: "Smart Reminders",
                description: "Never miss a deadline with intelligent notifications for GST, TDS, and payments",
                delay: 0.5,
                color: "text-error",
                bgColor: "bg-error/10"
              },
              {
                icon: Zap,
                title: "E-Invoice Generation",
                description: "Generate IRN-compliant e-invoices instantly with GST portal integration",
                delay: 0.6,
                color: "text-warning",
                bgColor: "bg-warning/10"
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Indian Businesses
            </h2>
            <p className="text-muted-foreground text-lg">
              By experts who understand compliance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Save 10+ Hours Weekly",
                description: "Automate repetitive tasks and focus on growing your business",
                delay: 0.1
              },
              {
                title: "100% Compliance",
                description: "Stay updated with latest Indian tax regulations automatically",
                delay: 0.2
              },
              {
                title: "Reduce Errors by 95%",
                description: "AI-powered accuracy in classification and calculations",
                delay: 0.3
              },
              {
                title: "Multi-Business Support",
                description: "Manage multiple GSTINs and business entities from one dashboard",
                delay: 0.4
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: benefit.delay }}
                viewport={{ once: true }}
                className="flex gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 p-12 text-center border border-primary/30 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Finance Management?
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Join hundreds of Indian businesses already using LedgerTalk
              </p>
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="shadow-lg font-semibold px-8"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                LedgerTalk
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 LedgerTalk. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;