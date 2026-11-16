import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page has moved or never existed"
      accent={["moved"]}
      description="The catalogue is the fastest way back to what you were looking for."
    >
      <Button href="/products" className="mt-9">
        Browse the catalogue
      </Button>
    </PageHero>
  );
}
