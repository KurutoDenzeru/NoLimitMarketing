import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface HeroAnalysisDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

interface FormState {
    fullName: string;
    email: string;
    company: string;
    phone: string;
    question: string;
    findUs: string;
    adSpend: string;
    website?: string;
}

const requiredFields: Array<keyof FormState> = [
    "fullName",
    "email",
    "company",
    "phone",
    "question",
    "findUs",
    "adSpend",
];

function HeroAnalysisDialog({ isOpen, onOpenChange }: HeroAnalysisDialogProps) {
    const [form, setForm] = useState<FormState>({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        question: "",
        findUs: "",
        adSpend: "",
        website: "",
    });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        if (name === "phone") {
            // Only allow numbers, spaces, dashes, parentheses, and plus
            const cleaned = value.replace(/[^\d\s\-()+]/g, "");
            setForm({ ...form, [name]: cleaned });
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    function handleSelect(name: keyof FormState, value: string) {
        setForm({ ...form, [name]: value });
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTouched({ ...touched, [e.target.name]: true });
    }

    function isFieldInvalid(field: keyof FormState) {
        return (hasSubmitted || touched[field]) && !form[field];
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setHasSubmitted(true);
        const missing = requiredFields.filter(field => !form[field]);
        if (missing.length === 0) {
            try {
                const res = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                const result = await res.json();
                if (result.success) {
                    console.log('Email has been sent! Message ID:', result.messageId);
                } else {
                    console.error('Email send failed:', result.error);
                }
            } catch (err) {
                console.error('Error sending email:', err);
            }
            onOpenChange(false);
        }
    }

    function showAsterisk(field: keyof FormState) {
        return isFieldInvalid(field) || !form[field];
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Get Your FREE Marketing Analysis</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div>
                        <Label htmlFor="full-name" className="flex items-center gap-1 mb-2">
                            Full Name
                            {showAsterisk("fullName") && <span className="text-red-600">*</span>}
                        </Label>
                        <Input
                            id="full-name"
                            name="fullName"
                            type="text"
                            placeholder="Your full name"
                            value={form.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={isFieldInvalid("fullName")}
                            required
                        />
                        {isFieldInvalid("fullName") && (
                            <span className="text-xs text-red-600">Full Name is required.</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="email" className="flex items-center gap-1 mb-2">
                            Email
                            {showAsterisk("email") && <span className="text-red-600">*</span>}
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={isFieldInvalid("email")}
                            required
                        />
                        {isFieldInvalid("email") && (
                            <span className="text-xs text-red-600">Email is required.</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="company" className="flex items-center gap-1 mb-2">
                            Company
                            {showAsterisk("company") && <span className="text-red-600">*</span>}
                        </Label>
                        <Input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Company name"
                            value={form.company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={isFieldInvalid("company")}
                            required
                        />
                        {isFieldInvalid("company") && (
                            <span className="text-xs text-red-600">Company is required.</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="phone" className="flex items-center gap-1 mb-2">
                            Phone
                            {showAsterisk("phone") && <span className="text-red-600">*</span>}
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            pattern="[\d\s\-()+]+"
                            placeholder="(555) 555-5555"
                            value={form.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={isFieldInvalid("phone")}
                            required
                        />
                        {isFieldInvalid("phone") && (
                            <span className="text-xs text-red-600">Phone is required.</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="question" className="flex items-center gap-1 mb-2">
                            What is your most important question?
                            {showAsterisk("question") && <span className="text-red-600">*</span>}
                        </Label>
                        <Textarea
                            id="question"
                            name="question"
                            placeholder="Type your question here..."
                            rows={3}
                            value={form.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={isFieldInvalid("question")}
                            required
                        />
                        {isFieldInvalid("question") && (
                            <span className="text-xs text-red-600">This field is required.</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="find-us" className="flex items-center gap-1 mb-2">
                            How did you find us?
                            {showAsterisk("findUs") && <span className="text-red-600">*</span>}
                        </Label>
                        <Select
                            name="findUs"
                            value={form.findUs}
                            onValueChange={value => handleSelect("findUs", value)}
                            required
                        >
                            <SelectTrigger id="find-us" className="w-full" aria-invalid={isFieldInvalid("findUs")}>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="google">Google Search</SelectItem>
                                <SelectItem value="referral">Referral</SelectItem>
                                <SelectItem value="social">Social Media</SelectItem>
                                <SelectItem value="ad">Online Ad</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        {isFieldInvalid("findUs") && (
                            <span className="text-xs text-red-600">Please select an option.</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="ad-spend" className="flex items-center gap-1 mb-2">
                            Monthly advertising spend (USD)
                            {showAsterisk("adSpend") && <span className="text-red-600">*</span>}
                        </Label>
                        <Select
                            name="adSpend"
                            value={form.adSpend}
                            onValueChange={value => handleSelect("adSpend", value)}
                            required
                        >
                            <SelectTrigger id="ad-spend" className="w-full" aria-invalid={isFieldInvalid("adSpend")}>
                                <SelectValue placeholder="Select amount" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="under-1k">$0 - $500</SelectItem>
                                <SelectItem value="1k-5k">$500 - $1,000</SelectItem>
                                <SelectItem value="5k-10k">$1,000 - $5,000</SelectItem>
                                <SelectItem value="10k-plus">$5,000+</SelectItem>
                                <SelectItem value="not-advertising">Not currently advertising</SelectItem>
                            </SelectContent>
                        </Select>
                        {isFieldInvalid("adSpend") && (
                            <span className="text-xs text-red-600">Please select an amount.</span>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="website" className="flex items-center gap-1 mb-2">
                            Website (optional)
                        </Label>
                        <Input
                            id="website"
                            name="website"
                            type="url"
                            placeholder="https://yourwebsite.com"
                            value={form.website}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer">
                            Get Free Analysis
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { HeroAnalysisDialog };