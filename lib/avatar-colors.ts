import type { AvatarColor } from "@/lib/data/kids";

export const avatarBgClasses: Record<AvatarColor, string> = {
  sky: "bg-avatar-sky",
  pink: "bg-avatar-pink",
  green: "bg-avatar-green",
  yellow: "bg-avatar-yellow",
  purple: "bg-avatar-purple",
};

export const avatarInkClasses: Record<AvatarColor, string> = {
  sky: "text-avatar-sky-ink",
  pink: "text-avatar-pink-ink",
  green: "text-avatar-green-ink",
  yellow: "text-avatar-yellow-ink",
  purple: "text-avatar-purple-ink",
};
