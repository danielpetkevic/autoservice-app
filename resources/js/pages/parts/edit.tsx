import FormCard from '@/components/forms/form-card';
import PartFormInputs from '@/components/service-associated/part-form-inputs';
import { index, update } from '@/routes/parts';
import { Form, Head } from '@inertiajs/react';
import { Package } from 'lucide-react';
import type { Part } from '@/types';
import { useTranslation } from 'react-i18next';

interface Props {
    part: Pick<
        Part,
        'id' | 'name' | 'description' | 'sku' | 'price' | 'stock_quantity'
    >;
}

export default function PartEdit({ part }: Props) {
    const { t } = useTranslation();
    return (
        <>
            <Head title={t('forms.edit_part')} />

            <Form {...update.form(part.id)}>
                {({ processing, errors }) => (
                    <FormCard
                        title={t('forms.edit_part')}
                        description={t('forms.edit_part_description')}
                        icon={<Package className="size-6" />}
                        backUrl={index.url()}
                        backLabel={t('forms.back_to_parts')}
                        submitLabel={t('forms.submit_changes')}
                        processing={processing}
                    >
                        <PartFormInputs errors={errors} part={part} />
                    </FormCard>
                )}
            </Form>
        </>
    );
}
