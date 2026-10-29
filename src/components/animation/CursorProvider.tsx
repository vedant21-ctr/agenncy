"use client";

import React from "react";

/**
 * Normal system cursor everywhere - custom cursor effects removed as per brand guidelines.
 */
export default function CursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
