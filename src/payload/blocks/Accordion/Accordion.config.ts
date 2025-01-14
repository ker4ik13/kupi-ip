import { background } from '@/payload/fields/background'
import { basicEditor } from '@/payload/fields/lexical'
import { en } from '@/payload/i18n/en'
import { ru } from '@/payload/i18n/ru'
import { Block } from 'payload'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  labels: {
    singular: {
      en: 'Accordion',
      ru: 'Аккордеон',
    },
    plural: {
      en: 'Accordions',
      ru: 'Аккордеоны',
    },
  },
  fields: [
    background(),
    {
      name: 'prefix',
      type: 'select',
      defaultValue: 'none',
      label: {
        en: 'Prefix',
        ru: ru.common.title.singular,
      },
      admin: {
        isClearable: false,
      },
      options: [
        {
          label: {
            en: 'None',
            ru: 'Нет',
          },
          value: 'none',
        },
        {
          label: {
            en: 'Smiley',
            ru: 'Смайлик',
          },
          value: 'smiley',
        },
        {
          label: {
            en: 'Rich Text',
            ru: 'Форматированный текст',
          },
          value: 'richText',
        },
      ],
    },
    {
      name: 'smileyTitle',
      type: 'richText',
      editor: basicEditor({ disableAlign: true, disableHeadings: true }),
      admin: {
        condition: (_, siblingData) => siblingData?.prefix === 'smiley',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: {
        en: en.common.content,
        ru: ru.common.content,
      },
      editor: basicEditor({ headingSizes: ['h2', 'h3', 'h4'] }),
      admin: {
        condition: (_, siblingData) => siblingData?.prefix === 'richText',
      },
    },
    {
      name: 'type',
      label: {
        en: 'Type',
        ru: ' Тип',
      },
      type: 'select',
      defaultValue: 'manual',
      options: [
        {
          label: {
            en: 'Manual',
            ru: 'Ввести вручную',
          },
          value: 'manual',
        },
        {
          label: {
            en: 'Preset',
            ru: 'Шаблон',
          },
          value: 'preset',
        },
      ],
    },
    {
      name: 'preset',
      label: {
        en: 'Preset',
        ru: 'Шаблон',
      },
      type: 'relationship',
      relationTo: 'accordion-preset',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'preset',
      },
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'manual',
      },
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
