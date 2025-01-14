import { basicEditor } from '@/payload/fields/lexical'
import { en } from '@/payload/i18n/en'
import { ru } from '@/payload/i18n/ru'
import { CollectionConfig } from 'payload'

export const AccordionPreset: CollectionConfig = {
  slug: 'accordion-preset',
  labels: {
    singular: {
      en: 'Accordion Preset',
      ru: 'Шаблон аккордеона',
    },
    plural: {
      en: 'Accordion Presets',
      ru: 'Шаблоны аккордеона',
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: {
        en: en.common.name.title.singular,
        ru: ru.common.name.title.singular,
      },
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      label: {
        en: en.common.item.plural,
        ru: ru.common.item.plural,
      },
      labels: {
        singular: {
          en: en.common.item.singular,
          ru: ru.common.item.singular,
        },
        plural: {
          en: en.common.item.plural,
          ru: ru.common.item.plural,
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: en.common.title.singular,
            ru: ru.common.title.singular,
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: {
            en: en.common.content,
            ru: ru.common.content,
          },
          editor: basicEditor({ disableAlign: true, disableHeadings: true }),
        },
      ],
    },
  ],
}
