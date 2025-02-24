"use client"

import { Anchor, AppShell, List, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { Header } from '../components/Header';

export default function About() {
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      withBorder={false}
    >
      <Header />
      <AppShell.Main>
        <div className="max-w-3xl mx-auto mt-12 px-6">
          <Title order={1} className="mb-8 text-center text-4xl font-bold">About me and Trevo</Title>

        
          <Text size="lg" className="mb-6 leading-relaxed text-center">
            Hi! 👋 Thanks for checking out Trevo! I'm excited to share this project with you and hope you find it useful in your development workflow. 
          </Text>
            <Image 
              src="https://avatars.githubusercontent.com/u/64823667?s=400&u=2c10bb1ec1887d4d5e491acd5f1cf7842fe1982e&v=4" 
              alt="Lucas Andrade"
              width={192}
              height={192}
              className="rounded-full shadow-lg mx-auto mb-4"
            />
          <Text size="lg" className="mb-6 leading-relaxed">
            My name is <strong>Lucas Andrade</strong>, and I am a software engineer passionate about building tools that empower developers to work smarter and more efficiently. 
            My focus is on creating intuitive and robust solutions that simplify complex workflows, making the development process smoother and more enjoyable.
          </Text>

          <Text size="lg" className="mb-6 leading-relaxed">
            <strong>Trevo</strong> is an <span className="text-green-600 font-semibold">open-source</span> API testing tool designed to make interacting with APIs seamless. 
            Whether you're debugging an endpoint, testing integrations, or automating API requests, Trevo provides a <em>clean</em> and <em>efficient</em> environment to streamline the process.
          </Text>

          <Text size="lg" className="mb-6 leading-relaxed">
            With a focus on <strong>speed</strong>, <strong>usability</strong>, and <strong>developer experience</strong>, Trevo eliminates unnecessary complexity, allowing you to spend more time building and less time troubleshooting API issues.
          </Text>

          <Title order={2} className="mb-4 text-center text-2xl font-bold">You can also:</Title>
          <List spacing="xs" size="lg" center className='text-center mb-8'>
            <List.Item>View and use request history</List.Item>
            <List.Item>Copy your requests as cURL</List.Item>
            <List.Item>Copy responses to the clipboard</List.Item>
            <List.Item>Toggle between light and dark mode</List.Item>
          </List>
          <Title order={3} className="mb-4 text-center text-2xl font-bold">And coming soon:</Title>
          <List spacing="xs" size="lg" center className='text-center'>
            <List.Item>Save and manage collections of requests</List.Item>
            <List.Item>Export and import collections</List.Item>
            <List.Item>Customize your request environment</List.Item>
            <List.Item>And more!</List.Item>
          </List>

          <div className='w-full text-center mb-4 mt-8'>
          <Anchor href='https://github.com/olucasandrade/trevo/compare' target='_blank'>#enjoy</Anchor>
          </div>
        </div>
      </AppShell.Main>
      </AppShell>
  );
}
