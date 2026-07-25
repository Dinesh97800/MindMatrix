"use client";

import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser";
import Link from "next/link";
import type { CSSProperties, ElementType } from "react";

const ROUTE_MAP: Record<string, string> = {
  Services: "/services",
  Industries: "/industries",
  Technology: "/technologies",
  Insights: "/insights-and-engineering-blog",
  About: "/about-us",
  "Request Consultation": "/request-consultation",
  "Contact Sales": "/contact-us",
};

function parseStyleString(style: string): CSSProperties {
  return style
    .split(";")
    .filter(Boolean)
    .reduce<CSSProperties>((acc, rule) => {
      const [prop, val] = rule.split(":").map((s) => s.trim());
      if (!prop || !val) return acc;
      const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      (acc as Record<string, string>)[camel] = val;
      return acc;
    }, {});
}

function getClassName(attribs: Record<string, string>) {
  return attribs.className || attribs.class || undefined;
}

function getLinkText(domNode: Element): string {
  return domNode.children
    .map((child) => {
      if ("data" in child && typeof child.data === "string") return child.data;
      return "";
    })
    .join("")
    .trim()
    .replace(/\s+/g, " ");
}

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (!(domNode instanceof Element)) return;

    const { attribs } = domNode;
    const className = getClassName(attribs);
    const href = attribs.href;
    const src = attribs.src;
    const style = attribs.style;

    if (domNode.name === "a" && href) {
      const text = getLinkText(domNode);
      const mapped = ROUTE_MAP[text];
      const resolved =
        mapped ||
        (href.startsWith("/") ? href : href === "#" && mapped ? mapped : href);

      if (
        resolved.startsWith("/") ||
        (!resolved.startsWith("http") && resolved !== "#")
      ) {
        const path = resolved.startsWith("/") ? resolved : `/${resolved}`;
        return (
          <Link href={path} className={className}>
            {domToReact(domNode.children as DOMNode[], options)}
          </Link>
        );
      }
    }

    if (domNode.name === "img" && src) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={attribs.alt || attribs["data-alt"] || ""}
          className={className}
          loading="lazy"
        />
      );
    }

    if (style && ["div", "section", "header"].includes(domNode.name)) {
      const Tag = domNode.name as ElementType;
      return (
        <Tag className={className} style={parseStyleString(style)}>
          {domToReact(domNode.children as DOMNode[], options)}
        </Tag>
      );
    }
  },
};

function preprocessHtml(html: string) {
  return html.replace(/\sclass=/g, " className=");
}

interface StitchHtmlContentProps {
  html: string;
}

export function StitchHtmlContent({ html }: StitchHtmlContentProps) {
  return <>{parse(preprocessHtml(html), options)}</>;
}
