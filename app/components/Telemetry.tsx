"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";

type ClientEvent =
  | {
      type: "web-vital";
      name: string;
      id: string;
      value: number;
      delta: number;
      rating: string;
      navigationType: string;
    }
  | {
      type: "client-error" | "unhandled-rejection";
      name: string;
      message: string;
    };

function trim(value: unknown, maxLength = 300) {
  return String(value ?? "Unknown error").slice(0, maxLength);
}

function sendEvent(event: ClientEvent) {
  const payload = JSON.stringify({
    ...event,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/telemetry", new Blob([payload], { type: "application/json" }));
    return;
  }

  void fetch("/api/telemetry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  });
}

export function Telemetry() {
  useReportWebVitals((metric) => {
    sendEvent({
      type: "web-vital",
      name: metric.name,
      id: metric.id,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });
  });

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      sendEvent({
        type: "client-error",
        name: trim(event.error?.name ?? "Error", 80),
        message: trim(event.message),
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      sendEvent({
        type: "unhandled-rejection",
        name: trim(reason instanceof Error ? reason.name : "UnhandledRejection", 80),
        message: trim(reason instanceof Error ? reason.message : reason),
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
