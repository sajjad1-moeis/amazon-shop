import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SectionContainer({ title, description, children }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-5 text-right">
      <DialogHeader className="mb-1 text-right">
        <DialogTitle className=" text-center text-gray-700 text-2xl font-normal">{title}</DialogTitle>

        {description && (
          <p className="!mt-6 text-sm text-muted-foreground text-gray-400 text-right leading-relaxed">{description}</p>
        )}
      </DialogHeader>

      {children}
    </div>
  );
}
