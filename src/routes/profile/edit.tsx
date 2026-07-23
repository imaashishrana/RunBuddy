import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getProfile, saveProfile, type Profile, uploadAvatar } from "@/lib/profile";

export const Route = createFileRoute("/profile/edit")({
  component: ProfileEdit,
  head: () => ({ meta: [{ title: "Edit Profile · RunBuddy" }] }),
});

function ProfileEdit() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [pace, setPace] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth" });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    setProfileLoading(true);
    getProfile(user.id).then(({ data, error }) => {
      if (!mounted) return;
      if (error) {
        setError(error.message);
        setProfileLoading(false);
        return;
      }
      if (data) {
        setProfile(data);
        setFullName(data.full_name ?? user.user_metadata?.full_name ?? "");
        setBio(data.bio ?? "");
        setCity(data.city ?? "");
        setPace(data.pace ?? "");
        if (data.avatar_url) {
          setAvatarPreview(data.avatar_url);
        }
      } else {
        setFullName(user.user_metadata?.full_name ?? "");
      }
      setProfileLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setError(null);
    if (!file) {
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      let avatarUrl = profile?.avatar_url ?? undefined;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(user.id, avatarFile);
      }

      const profilePayload = {
        id: user.id,
        full_name: fullName || null,
        bio: bio || null,
        city: city || null,
        pace: pace || null,
        avatar_url: avatarUrl ?? null,
      };

      const response = await saveProfile(profilePayload, Boolean(profile));
      if (response.error) {
        throw response.error;
      }

      setSuccess("Profile updated successfully.");
      setTimeout(() => navigate({ to: "/profile" }), 800);
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err && typeof (err as any).message === "string"
          ? (err as any).message
          : "Unable to save profile.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const isDisabled = saving || profileLoading || !fullName.trim();

  const avatarClass = useMemo(
    () =>
      avatarPreview
        ? "h-24 w-24 rounded-full object-cover"
        : "grid h-24 w-24 place-items-center rounded-full bg-white/20 text-3xl font-bold",
    [avatarPreview]
  );

  if (loading || !user) {
    return null;
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <div className="grad-hero relative overflow-hidden px-6 pt-14 pb-16 text-primary-foreground">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <button onClick={() => navigate({ to: "/profile" })} className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold">Edit profile</h1>
        <p className="mt-2 text-sm opacity-90">Update your details and upload an avatar.</p>
      </div>

      <div className="-mt-8 flex-1 rounded-t-[2rem] bg-background px-6 pt-8 pb-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-4">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className={avatarClass} />
              ) : (
                <div className={avatarClass}>{fullName?.charAt(0).toUpperCase() || "A"}</div>
              )}
            </label>
            <div>
              <p className="text-sm font-semibold">Profile photo</p>
              <p className="text-xs text-muted-foreground">JPEG or PNG</p>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="mt-3" />
            </div>
          </div>

          <Input label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short running bio" />
          <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city" />
          <Input label="Pace" value={pace} onChange={(e) => setPace(e.target.value)} placeholder="5:24" />

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          {success && <p className="text-sm font-medium text-primary">{success}</p>}

          <button
            type="submit"
            disabled={isDisabled}
            className={`grad-primary shadow-float w-full rounded-2xl py-4 text-base font-semibold text-primary-foreground ${isDisabled ? "opacity-60" : ""}`}
          >
            {saving ? "Saving..." : "Save profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
