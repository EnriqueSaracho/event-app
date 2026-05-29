import { notFound } from "next/navigation";
import { getMockContentById } from "@/lib/admin/mock-content";
import { ContentEditor } from "@/components/admin/ContentEditor";

type ContentEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ContentEditPage({ params }: ContentEditPageProps) {
  const { id } = await params;
  const item = getMockContentById(id);

  if (!item) {
    notFound();
  }

  return <ContentEditor item={item} />;
}
