import { cn } from "@/lib/utils";

export const PageContainer = ({ title, description, children, className }) => {
  return (
    <div className={cn("flex flex-col min-h-screen py-8 px-4", className)}>
      {(title || description) && (
        <div className="mb-8 space-y-2">
          {title && (
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="flex-1 px-10">{children}</div>
    </div>
  );
};
