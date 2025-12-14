'use client';

import Link from 'next/link';
import { Trans } from '@kit/ui/trans';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

import { AppLogo } from '~/components/app-logo';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: '#',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: '#',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#',
    },
    {
      name: 'Email',
      icon: Mail,
      href: '#',
    },
  ];

  return (
    <footer className="relative mt-auto w-full bg-blue-600 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <AppLogo className="w-[85px] md:w-[95px]" />
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-md">
              <Trans i18nKey="marketing:footerDescription" />
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500 bg-blue-700/50 transition-colors hover:border-blue-400 hover:bg-blue-700"
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className="text-xs text-blue-100">
              © {currentYear} TechBlog. All rights reserved.
            </p>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Get Started Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">
                Get Started
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/auth/sign-in"
                    className="text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    <Trans i18nKey="auth:signIn" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/sign-up"
                    className="text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    <Trans i18nKey="auth:signUp" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">
                <Trans i18nKey="marketing:legal" />
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    <Trans i18nKey="marketing:termsOfService" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    <Trans i18nKey="marketing:privacyPolicy" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    <Trans i18nKey="marketing:cookiePolicy" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blog Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">
                Blog
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    Latest Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/add-post"
                    className="text-sm text-blue-100 transition-colors hover:text-white"
                  >
                    Write Article
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-500">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-blue-100 text-center sm:text-left">
              Made with passion for sharing knowledge and stories.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <span>Powered by</span>
              <span className="font-semibold text-white">
                TechBlog
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
