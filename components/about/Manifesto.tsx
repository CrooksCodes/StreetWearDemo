import { Container } from '@/components/ui/Container';

/**
 * Manifesto — centered editorial display type.
 *
 * Three or four declarative statements that define the brand ethos.
 * Prose-width container keeps lines comfortable for reading at
 * large display sizes.
 */
export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-heading" className="py-24 md:py-32">
      <Container width="prose" className="text-center">
        <h2 id="manifesto-heading" className="sr-only">
          Manifesto
        </h2>
        <div className="space-y-8 font-display text-display-3 leading-tight">
          <p>We don&apos;t follow seasons.</p>
          <p className="text-bone-muted">We don&apos;t restock.</p>
          <p>We make a chapter, sell it through, and move on.</p>
          <p className="text-bone-muted">
            The pieces you wear today won&apos;t exist twelve months from now.
          </p>
        </div>
      </Container>
    </section>
  );
}
