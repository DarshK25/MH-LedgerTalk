'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  Users, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

type OnboardingStep = 'choice' | 'invite' | 'join-existing' | 'create-org' | 'team-invite' | 'tour';

interface OrganizationData {
  name: string;
  industry: string;
  legalStructure: string;
  businessStage: string;
  description: string;
  teamSize: string;
  revenueRange: string;
  departments: string[];
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState<OnboardingStep>('choice');
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteValidation, setInviteValidation] = useState<any>(null);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const [availableOrgs, setAvailableOrgs] = useState<any[]>([]);
  
  const [orgData, setOrgData] = useState<OrganizationData>({
    name: '',
    industry: '',
    legalStructure: '',
    businessStage: '',
    description: '',
    teamSize: '',
    revenueRange: '',
    departments: [],
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
    'Education', 'Real Estate', 'Hospitality', 'Consulting', 'Other'
  ];

  const legalStructures = [
    'Sole Proprietorship', 'Partnership', 'LLP', 'Private Limited', 
    'Public Limited', 'NGO', 'Other'
  ];

  const businessStages = [
    'Idea Stage', 'Startup', 'Growth', 'Established', 'Enterprise'
  ];

  const teamSizes = [
    '1-10', '11-50', '51-200', '201-500', '500+'
  ];

  const revenueRanges = [
    'Pre-revenue', '< ₹10L', '₹10L - ₹1Cr', '₹1Cr - ₹10Cr', '> ₹10Cr'
  ];

  const departmentOptions = [
    'Sales', 'Marketing', 'Finance', 'HR', 'Operations', 
    'IT', 'Customer Support', 'Product', 'Legal'
  ];

  const validateInviteCode = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/onboarding/validate-invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: inviteCode }),
      });
      const data = await res.json();
      if (data.valid) {
        setInviteValidation(data);
      } else {
        alert('Invalid or expired invite code');
      }
    } catch (error) {
      alert('Error validating invite code');
    } finally {
      setLoading(false);
    }
  };

  const checkExistingOrgs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/onboarding/check-organizations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
      });
      const data = await res.json();
      if (data.organizations && data.organizations.length > 0) {
        setAvailableOrgs(data.organizations);
        setStep('join-existing');
      } else {
        setStep('create-org');
      }
    } catch (error) {
      setStep('create-org');
    } finally {
      setLoading(false);
    }
  };

  const joinWithInvite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/onboarding/join-with-invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: inviteCode, userId: user?.id }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/dashboard');
      }
    } catch (error) {
      alert('Error joining organization');
    } finally {
      setLoading(false);
    }
  };

  const joinOrganization = async (orgId: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/onboarding/join-organization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: orgId, userId: user?.id }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/dashboard');
      }
    } catch (error) {
      alert('Error joining organization');
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/onboarding/create-organization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orgData, userId: user?.id }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('team-invite');
      }
    } catch (error) {
      alert('Error creating organization');
    } finally {
      setLoading(false);
    }
  };

  const skipToTour = () => {
    setStep('tour');
  };

  const completeTour = async () => {
    await fetch(`/api/onboarding/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id }),
    });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 'choice' && (
          <motion.div
            key="choice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl">Welcome to LedgerTalk! 👋</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Let's get you set up. How would you like to get started?
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:border-primary transition-all hover:shadow-lg" onClick={() => setStep('invite')}>
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">I have an invite code</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Join an existing organization with your invite code
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-all hover:shadow-lg" onClick={checkExistingOrgs}>
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Join or create organization</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Create a new workspace or join an existing one
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'invite' && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>Enter Invite Code</CardTitle>
                <CardDescription>
                  Enter the invite code you received to join an organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!inviteValidation ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="inviteCode">Invite Code</Label>
                      <Input
                        id="inviteCode"
                        placeholder="ABC123XYZ"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                        className="text-lg tracking-wider"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep('choice')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button onClick={validateInviteCode} disabled={!inviteCode || loading} className="flex-1">
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Validate Code
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div className="space-y-2 flex-1">
                          <h3 className="font-semibold text-lg">You're joining:</h3>
                          <p className="text-2xl font-bold">{inviteValidation.organization.name}</p>
                          <p className="text-muted-foreground">{inviteValidation.organization.description}</p>
                          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Industry:</span>
                              <p className="font-medium">{inviteValidation.organization.industry}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Your Role:</span>
                              <p className="font-medium capitalize">{inviteValidation.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => { setInviteValidation(null); setInviteCode(''); }}>
                        Cancel
                      </Button>
                      <Button onClick={joinWithInvite} disabled={loading} className="flex-1">
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                        Confirm & Join
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'join-existing' && (
          <motion.div
            key="join-existing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>Organizations Found</CardTitle>
                <CardDescription>
                  We found organizations matching your email domain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableOrgs.map((org) => (
                  <Card key={org.id} className="hover:border-primary transition-all cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h3 className="font-semibold text-lg">{org.name}</h3>
                          <p className="text-sm text-muted-foreground">{org.description}</p>
                          <div className="flex gap-6 text-sm mt-3">
                            <span><strong>Industry:</strong> {org.industry}</span>
                            <span><strong>Team:</strong> {org.teamSize}</span>
                          </div>
                        </div>
                        <Button onClick={() => joinOrganization(org.id)} disabled={loading}>
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep('choice')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button variant="outline" onClick={() => setStep('create-org')} className="flex-1">
                    Create New Organization Instead
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'create-org' && (
          <motion.div
            key="create-org"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle>Create Your Organization</CardTitle>
                <CardDescription>
                  Tell us about your business to help us configure the platform for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      placeholder="Acme Corporation"
                      value={orgData.name}
                      onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select value={orgData.industry} onValueChange={(value) => setOrgData({ ...orgData, industry: value })}>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="legalStructure">Legal Structure *</Label>
                    <Select value={orgData.legalStructure} onValueChange={(value) => setOrgData({ ...orgData, legalStructure: value })}>
                      <SelectTrigger id="legalStructure">
                        <SelectValue placeholder="Select structure" />
                      </SelectTrigger>
                      <SelectContent>
                        {legalStructures.map((struct) => (
                          <SelectItem key={struct} value={struct}>{struct}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessStage">Business Stage *</Label>
                    <Select value={orgData.businessStage} onValueChange={(value) => setOrgData({ ...orgData, businessStage: value })}>
                      <SelectTrigger id="businessStage">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessStages.map((stage) => (
                          <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size *</Label>
                    <Select value={orgData.teamSize} onValueChange={(value) => setOrgData({ ...orgData, teamSize: value })}>
                      <SelectTrigger id="teamSize">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="revenueRange">Revenue Range</Label>
                    <Select value={orgData.revenueRange} onValueChange={(value) => setOrgData({ ...orgData, revenueRange: value })}>
                      <SelectTrigger id="revenueRange">
                        <SelectValue placeholder="Select revenue range" />
                      </SelectTrigger>
                      <SelectContent>
                        {revenueRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your business..."
                      value={orgData.description}
                      onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <Label>Departments (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {departmentOptions.map((dept) => (
                        <div key={dept} className="flex items-center space-x-2">
                          <Checkbox
                            id={dept}
                            checked={orgData.departments.includes(dept)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setOrgData({ ...orgData, departments: [...orgData.departments, dept] });
                              } else {
                                setOrgData({ ...orgData, departments: orgData.departments.filter(d => d !== dept) });
                              }
                            }}
                          />
                          <label htmlFor={dept} className="text-sm cursor-pointer">
                            {dept}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep('choice')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={createOrganization} 
                    disabled={!orgData.name || !orgData.industry || !orgData.legalStructure || !orgData.businessStage || !orgData.teamSize || loading}
                    className="flex-1"
                  >
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                    Create Organization
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'team-invite' && (
          <motion.div
            key="team-invite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>Invite Your Team</CardTitle>
                <CardDescription>
                  You can invite team members now or skip and do it later
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-dashed p-8 text-center space-y-4">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Team invites will be available in your dashboard
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={skipToTour} className="flex-1">
                    Skip for Now
                  </Button>
                  <Button onClick={skipToTour} className="flex-1">
                    Continue to Tour
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'tour' && (
          <motion.div
            key="tour"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-3xl"
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Product Tour</CardTitle>
                <CardDescription>
                  Let's explore the key features of LedgerTalk
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6 space-y-3">
                      <Briefcase className="w-10 h-10 text-primary" />
                      <h3 className="font-semibold">Dashboard</h3>
                      <p className="text-sm text-muted-foreground">
                        Monitor your finances with real-time insights and analytics
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-6 space-y-3">
                      <TrendingUp className="w-10 h-10 text-primary" />
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-sm text-muted-foreground">
                        Get personalized financial advice powered by AI
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-6 space-y-3">
                      <Building2 className="w-10 h-10 text-primary" />
                      <h3 className="font-semibold">GST Compliance</h3>
                      <p className="text-sm text-muted-foreground">
                        Automated GST calculations and return filing
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-6 space-y-3">
                      <Users className="w-10 h-10 text-primary" />
                      <h3 className="font-semibold">Team Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Collaborate with your team on financial tasks
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Button onClick={completeTour} className="w-full" size="lg">
                  Get Started with LedgerTalk
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
