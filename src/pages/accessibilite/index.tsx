import { GetStaticPropsResult } from 'next';

import { ConsulterContenu, ConsulterContenuProps } from '~/client/components/features/Contenu/ConsulterContenu';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { dependencies } from '~/server/start';

export default function Accessibilite({ titre, contenu }: ConsulterContenuProps) {
  return (
    <ConsulterContenu titre={titre} contenu={contenu}/>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ConsulterContenuProps>> {
  const response = await dependencies.cmsDependencies.consulterMentionObligatoire.handle(MentionsObligatoires.ACCESSIBILITE);

  if (response.instance === 'failure') {
    return { notFound: true, revalidate: 1 };
  }

  const { titre, contenu } = JSON.parse(JSON.stringify(response.result));

  return {
    props: {
      contenu,
      titre,
    },
    revalidate: false,
  };
}
