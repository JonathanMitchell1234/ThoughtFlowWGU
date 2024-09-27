"use client";

import React from "react";
import styled from "styled-components";
import { Download, BookOpen, Brain, Lock, Smartphone } from "lucide-react";

const AppContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	background: linear-gradient(to bottom, #f3e8ff, #e9d5ff);
`;

const Header = styled.header`
	background-color: white;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const HeaderContent = styled.div`
	max-width: 1280px;
	margin: 0 auto;
	padding: 1rem;
`;

const HeaderTitle = styled.h1`
	font-size: 1.5rem;
	font-weight: bold;
	color: #6b21a8;
`;

const Main = styled.main`
	flex-grow: 1;
`;

const MainContent = styled.div`
	max-width: 1280px;
	margin: 0 auto;
	padding: 3rem 1rem;
`;

const CenteredText = styled.div`
	text-align: center;
`;

const MainTitle = styled.h2`
	font-size: 2.25rem;
	font-weight: 800;
	color: #111827;

	@media (min-width: 640px) {
		font-size: 2.5rem;
	}
`;

const MainDescription = styled.p`
	margin-top: 0.75rem;
	max-width: 42rem;
	margin-left: auto;
	margin-right: auto;
	font-size: 1.25rem;
	color: #6b7280;

	@media (min-width: 640px) {
		margin-top: 1rem;
	}
`;

const DownloadButton = styled.button`
	display: inline-flex;
	align-items: center;
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
	font-weight: 500;
	color: white;
	background-color: #9333ea;
	border: none;
	border-radius: 0.375rem;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: #7e22ce;
	}
`;

const FeaturesSection = styled.div`
	margin-top: 4rem;
`;

const FeaturesTitle = styled.h3`
	font-size: 1.5rem;
	font-weight: bold;
	color: #111827;
	margin-bottom: 2rem;
	text-align: center;
`;

const FeaturesGrid = styled.div`
	display: grid;
	gap: 2rem;
	grid-template-columns: repeat(1, 1fr);

	@media (min-width: 640px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1024px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const FeatureCard = styled.div`
	background-color: white;
	border-radius: 0.5rem;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	padding: 1.5rem;
`;

const FeatureCardContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

const FeatureIcon = styled.div`
	color: #9333ea;
`;

const FeatureTitle = styled.h4`
	margin-top: 1rem;
	font-size: 1.125rem;
	font-weight: 500;
	color: #111827;
`;

const FeatureDescription = styled.p`
	margin-top: 0.5rem;
	font-size: 0.875rem;
	color: #6b7280;
`;

const Footer = styled.footer`
	background-color: white;
`;

const FooterContent = styled.div`
	max-width: 1280px;
	margin: 0 auto;
	padding: 1rem;
`;

const FooterText = styled.p`
	text-align: center;
	color: #6b7280;
	font-size: 0.875rem;
`;

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

function FeatureCardComponent({ icon, title, description }: FeatureCardProps) {
	return (
		<FeatureCard>
			<FeatureCardContent>
				<FeatureIcon>{icon}</FeatureIcon>
				<FeatureTitle>{title}</FeatureTitle>
				<FeatureDescription>{description}</FeatureDescription>
			</FeatureCardContent>
		</FeatureCard>
	);
}

export default function Component() {
	return (
		<AppContainer>
			<Header>
				<HeaderContent>
					<HeaderTitle>ThoughtFlow</HeaderTitle>
				</HeaderContent>
			</Header>

			<Main>
				<MainContent>
					<CenteredText>
						<MainTitle>Your Personal Mental Health Companion</MainTitle>
						<MainDescription>Download ThoughtFlow APK for Android and start your journey to better mental health today.</MainDescription>
						<div style={{ marginTop: "2.5rem" }}>
							<a href="https://journalbucket3312.s3.us-east-2.amazonaws.com/thoughtflow3.apk" download>
								<DownloadButton>
									<Download style={{ marginRight: "0.5rem", height: "1.25rem", width: "1.25rem" }} /> Download APK
								</DownloadButton>
							</a>
						</div>
					</CenteredText>

					<FeaturesSection>
						<FeaturesTitle>Key Features</FeaturesTitle>
						<FeaturesGrid>
							<FeatureCardComponent
								icon={<BookOpen size={32} />}
								title="Daily Journaling"
								description="Record your thoughts, feelings, and experiences with ease."
							/>
							<FeatureCardComponent
								icon={<Brain size={32} />}
								title="Mood Tracking"
								description="Monitor your emotional well-being over time with intuitive mood logs."
							/>
							<FeatureCardComponent icon={<Lock size={32} />} title="Private & Secure" description="Your data is securely stored." />
							<FeatureCardComponent
								icon={<Smartphone size={32} />}
								title="AI Assistance"
								description="Built in AI to help you understand your mental health."
							/>
						</FeaturesGrid>
					</FeaturesSection>
				</MainContent>
			</Main>

			<Footer>
				<FooterContent>
					<FooterText>© 2024 ThoughtFlow. All rights reserved.</FooterText>
				</FooterContent>
			</Footer>
		</AppContainer>
	);
}
