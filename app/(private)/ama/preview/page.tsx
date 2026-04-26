import AmaPage from "@/components/ama-card";
import React from "react";

export default function AmaPreviewPage() {
  const previewProps = {
    username: "subhraneel1970",
    amaTitle: "yoo gng ask me anything :)",
    isOwner: false
  };
  return (
    <div>
      <AmaPage {...previewProps} />
    </div>
  );
}
