import React from 'react';
import PropertiDetail from '@/components/propertiDetail';

type Props = { params: { slug: string } };

export default function page({ params }: Props) {
  return (
    <div>
      <PropertiDetail slug={params.slug} />
    </div>
  );
}
