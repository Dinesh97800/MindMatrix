import { cmsError } from "@/lib/api/cms-auth";
import { CMS_CAPABILITIES } from "@/lib/cms/capabilities";
import type { CapabilityKey } from "@/lib/cms/capabilities.shared";

export function capabilityDisabledResponse(capability: CapabilityKey, message?: string) {
  return cmsError(
    message ??
      `This action is disabled in the current CMS configuration (${capability}).`,
    403
  );
}

export function requireCapability(capability: CapabilityKey) {
  if (!CMS_CAPABILITIES[capability]) {
    return { ok: false as const, response: capabilityDisabledResponse(capability) };
  }
  return { ok: true as const, response: null };
}

export function requireContentEditing() {
  return requireCapability("canEditContent");
}
