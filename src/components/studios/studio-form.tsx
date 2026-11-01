"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AmenityPicker from "@/components/studios/amenity-picker";
import StudioCard from "@/components/studios/studio-card";
import { uploadImage } from "@/lib/api";
import {
  createStudio,
  studioCategories,
  updateStudio,
  type CategorySlug,
  type Studio,
  type StudioInput,
  type StudioOwner,
} from "@/lib/studios";

type FormValues = Omit<
  StudioInput,
  "category" | "hourlyRate" | "securityDeposit" | "maxCapacity" | "gallery"
> & {
  category: CategorySlug | "";
  hourlyRate: string;
  securityDeposit: string;
  maxCapacity: string;
  gallery: string;
};

type FormErrors = Partial<Record<"gallery" | "amenities", string>>;

const toFormValues = (studio?: Studio): FormValues => ({
  title: studio?.title ?? "",
  category: studio?.category ?? "",
  hourlyRate: studio ? String(studio.hourlyRate) : "",
  securityDeposit: studio ? String(studio.securityDeposit) : "",
  maxCapacity: studio ? String(studio.maxCapacity) : "",
  location: studio?.location ?? "",
  image: studio?.image ?? "",
  gallery: studio?.gallery.join("\n") ?? "",
  amenities: studio?.amenities ?? [],
  overview: studio?.overview ?? "",
});

const parseGallery = (gallery: string) =>
  gallery
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

const toStudioInput = (values: FormValues): StudioInput => ({
  ...values,
  title: values.title.trim(),
  category: values.category as CategorySlug,
  hourlyRate: Number(values.hourlyRate),
  securityDeposit: Number(values.securityDeposit),
  maxCapacity: Number(values.maxCapacity),
  location: values.location.trim(),
  image: values.image.trim(),
  gallery: parseGallery(values.gallery),
  overview: values.overview.trim(),
});

const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!parseGallery(values.gallery).every(isHttpsUrl))
    errors.gallery = "Every gallery link must start with https://";
  if (values.amenities.length === 0)
    errors.amenities = "Pick at least one amenity.";
  return errors;
};

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

type FormSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const FormSection = ({ title, description, children }: FormSectionProps) => (
  <section className="rounded-3xl border bg-card p-6 sm:p-8">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="mt-1 mb-6 text-sm text-muted-foreground">{description}</p>
    <FieldGroup>{children}</FieldGroup>
  </section>
);

type StudioFormProps = {
  host: StudioOwner;
  studio?: Studio;
};

const StudioForm = ({ host, studio }: StudioFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState(() => toFormValues(studio));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setField("image", url);
      toast.success("Cover image uploaded");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadImage));
      setValues((prev) => ({
        ...prev,
        gallery: [...parseGallery(prev.gallery), ...urls].join("\n"),
      }));
      toast.success(`${urls.length} photo(s) uploaded`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Image upload failed",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const input = toStudioInput(values);
      if (studio) await updateStudio(studio._id, input, host);
      else await createStudio(input, host);

      toast.success(
        studio
          ? "Studio updated."
          : "Your studio is live! Creators can book it now.",
      );
      router.push("/my-listings");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save your studio",
      );
      setSubmitting(false);
    }
  };

  const preview: Studio = {
    ...toStudioInput(values),
    _id: "preview",
    title: values.title || "Your studio title",
    overview: values.overview || "Your overview appears here.",
    location: values.location || "Studio location",
    ownerName: host.name,
    ownerEmail: host.email,
    createdAt: "",
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection
          title="Host details"
          description="Listings are published under your account."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="host-name">Host name</FieldLabel>
              <Input
                id="host-name"
                value={host.name}
                readOnly
                className="h-10 bg-muted"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="host-email">Host email</FieldLabel>
              <Input
                id="host-email"
                value={host.email}
                readOnly
                className="h-10 bg-muted"
              />
            </Field>
          </div>
        </FormSection>

        <FormSection
          title="The basics"
          description="What creators see first when they browse."
        >
          <Field>
            <FieldLabel htmlFor="title">Studio title</FieldLabel>
            <Input
              id="title"
              required
              maxLength={80}
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Daylight Cyc Wall Studio"
              className="h-10"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <select
              id="category"
              required
              value={values.category}
              onChange={(e) =>
                setField("category", e.target.value as CategorySlug)
              }
              className={selectClass}
            >
              <option value="" disabled>
                Choose a category
              </option>
              {studioCategories.map(({ slug, label }) => (
                <option key={slug} value={slug}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
          <Field>
            <FieldLabel htmlFor="overview">Detailed overview</FieldLabel>
            <Textarea
              id="overview"
              required
              minLength={50}
              value={values.overview}
              onChange={(e) => setField("overview", e.target.value)}
              placeholder="Size, light, acoustics, included gear and what the space is best for."
              className="min-h-36"
            />
            <FieldDescription>At least 50 characters.</FieldDescription>
          </Field>
        </FormSection>

        <FormSection
          title="Pricing & capacity"
          description="All prices are in US dollars."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="hourly-rate">Hourly rate ($)</FieldLabel>
              <Input
                id="hourly-rate"
                type="number"
                required
                min={1}
                value={values.hourlyRate}
                onChange={(e) => setField("hourlyRate", e.target.value)}
                className="h-10"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="security-deposit">
                Security deposit ($)
              </FieldLabel>
              <Input
                id="security-deposit"
                type="number"
                required
                min={0}
                value={values.securityDeposit}
                onChange={(e) => setField("securityDeposit", e.target.value)}
                className="h-10"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="max-capacity">Max capacity</FieldLabel>
              <Input
                id="max-capacity"
                type="number"
                required
                min={1}
                value={values.maxCapacity}
                onChange={(e) => setField("maxCapacity", e.target.value)}
                className="h-10"
              />
            </Field>
          </div>
        </FormSection>

        <FormSection
          title="Location & photos"
          description="Upload photos or paste direct https image links."
        >
          <Field>
            <FieldLabel htmlFor="location">Location / address</FieldLabel>
            <Input
              id="location"
              required
              value={values.location}
              onChange={(e) => setField("location", e.target.value)}
              placeholder="e.g. Gulshan 2, Dhaka"
              className="h-10"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="cover-upload">Upload cover image</FieldLabel>
            <Input
              id="cover-upload"
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              disabled={uploading}
              className="h-10"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="image">Cover image URL</FieldLabel>
            <Input
              id="image"
              type="url"
              required
              pattern="https://.*"
              title="Use an https:// link"
              value={values.image}
              onChange={(e) => setField("image", e.target.value)}
              placeholder="https://i.ibb.co/…/studio.jpg"
              className="h-10"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="gallery-upload">
              Upload gallery photos
            </FieldLabel>
            <Input
              id="gallery-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              disabled={uploading}
              className="h-10"
            />
          </Field>

          <Field data-invalid={Boolean(errors.gallery)}>
            <FieldLabel htmlFor="gallery">
              Gallery image URLs (optional)
            </FieldLabel>
            <Textarea
              id="gallery"
              className="min-h-24"
              value={values.gallery}
              onChange={(e) => setField("gallery", e.target.value)}
              aria-invalid={Boolean(errors.gallery)}
              placeholder="One link per line"
            />
            {errors.gallery ? (
              <FieldError>{errors.gallery}</FieldError>
            ) : (
              <FieldDescription>
                Shown in the photo carousel on your studio page.
              </FieldDescription>
            )}
          </Field>
        </FormSection>

        <FormSection
          title="Amenities"
          description="Select everything included in the hourly rate."
        >
          <Field data-invalid={Boolean(errors.amenities)}>
            <AmenityPicker
              value={values.amenities}
              onChange={(amenities) => setField("amenities", amenities)}
            />
            {errors.amenities && <FieldError>{errors.amenities}</FieldError>}
          </Field>
        </FormSection>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/my-listings"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 px-6",
            })}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            size="lg"
            className="h-11 px-6"
            disabled={submitting || uploading}
          >
            {uploading
              ? "Uploading…"
              : submitting
                ? "Saving…"
                : studio
                  ? "Save Changes"
                  : "Publish Studio"}
          </Button>
        </div>
      </form>

      <aside className="hidden space-y-3 self-start lg:sticky lg:top-24 lg:block">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Live preview
        </p>
        {isHttpsUrl(values.image) ? (
          <div inert>
            <StudioCard studio={preview} />
          </div>
        ) : (
          <div className="flex aspect-3/4 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            <ImageIcon className="size-8" />
            Upload a cover image to preview how your studio card will look.
          </div>
        )}
      </aside>
    </div>
  );
};

export default StudioForm;
