'use client';
import { Brain, Users, Building2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const features = [
	{
        title: 'DO EVERYTHING YOURSELF?',
		icon: Brain,
        description: 'If you have little to do, it&apos;s not a problem. However, if you&apos;re busy... this is not feasible.',
	},
	{
        title: 'HIRE A STAFF?',
        icon: Users,
        description: 'Finding good people is difficult,  training them is expensive. Even if you find the perfect person...You still rely on one individual.',
	},
	{
        title: 'LET AN AGENCY HANDLE IT?',
        icon: Building2,
        description: 'Don&apos;t have a marketing budget of tens of thousands of dollars per month? Well then your account is often managed by the intern of the assistant of the assistant.Not ideal.',
	}
];

export default function MostOutOfYourMarketing() {
	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto w-full max-w-8xl space-y-8 px-4">
				<AnimatedContainer className="mx-auto max-w-8xl text-center">
					<h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
                        How to get the Most out of your Marketing?
					</h2>
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.4}
					className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
				>
					{features.map((feature, i) => (
						<FeatureCard key={i} feature={feature} />
					))}
				</AnimatedContainer>
			</div>
		</section>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
