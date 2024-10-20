import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const StudentScalarFieldEnumSchema = z.enum(['id','firstname','surename','class','extendedMath','description','defaultPrice','balance','isActive']);

export const ContactDataScalarFieldEnumSchema = z.enum(['id','type','value','studentId']);

export const PaymentScalarFieldEnumSchema = z.enum(['id','studentId','price','date']);

export const EventScalarFieldEnumSchema = z.enum(['id','date','isCanceled','isOverridden','type','eventSeriesId','name','description','startHour','endHour','price','isPaid','studentId']);

export const EventSeriesScalarFieldEnumSchema = z.enum(['id','type','pattern','startDate','endDate','isCanceled','name','description','startHour','endHour']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ContactTypeSchema = z.enum(['PHONE','EMAIL','FACEBOOK','DISCORD']);

export type ContactTypeType = `${z.infer<typeof ContactTypeSchema>}`

export const EventTypeSchema = z.enum(['DEFAULT','LESSON']);

export type EventTypeType = `${z.infer<typeof EventTypeSchema>}`

export const EventSeriesTypeSchema = z.enum(['DAILY','WEEKLY','MONTHLY','YEARLY']);

export type EventSeriesTypeType = `${z.infer<typeof EventSeriesTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  id: z.number().int(),
  firstname: z.string(),
  surename: z.string(),
  class: z.string().nullable(),
  extendedMath: z.boolean().nullable(),
  description: z.string().nullable(),
  defaultPrice: z.number().nullable(),
  balance: z.number(),
  isActive: z.boolean(),
})

export type Student = z.infer<typeof StudentSchema>

/////////////////////////////////////////
// CONTACT DATA SCHEMA
/////////////////////////////////////////

export const ContactDataSchema = z.object({
  type: ContactTypeSchema,
  id: z.number().int(),
  value: z.string(),
  studentId: z.number().int(),
})

export type ContactData = z.infer<typeof ContactDataSchema>

/////////////////////////////////////////
// PAYMENT SCHEMA
/////////////////////////////////////////

export const PaymentSchema = z.object({
  id: z.number().int(),
  studentId: z.number().int(),
  price: z.number().int(),
  date: z.coerce.date(),
})

export type Payment = z.infer<typeof PaymentSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  type: EventTypeSchema,
  id: z.number().int(),
  date: z.coerce.date(),
  isCanceled: z.boolean(),
  isOverridden: z.boolean(),
  eventSeriesId: z.number().int().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  startHour: z.string().nullable(),
  endHour: z.string().nullable(),
  price: z.number().nullable(),
  isPaid: z.boolean().nullable(),
  studentId: z.number().int().nullable(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT SERIES SCHEMA
/////////////////////////////////////////

export const EventSeriesSchema = z.object({
  type: EventSeriesTypeSchema,
  id: z.number().int(),
  pattern: z.string().nullable(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  isCanceled: z.boolean(),
  name: z.string(),
  description: z.string().nullable(),
  startHour: z.string().nullable(),
  endHour: z.string().nullable(),
})

export type EventSeries = z.infer<typeof EventSeriesSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// STUDENT
//------------------------------------------------------

export const StudentIncludeSchema: z.ZodType<Prisma.StudentInclude> = z.object({
  ContactData: z.union([z.boolean(),z.lazy(() => ContactDataFindManyArgsSchema)]).optional(),
  Payment: z.union([z.boolean(),z.lazy(() => PaymentFindManyArgsSchema)]).optional(),
  Event: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const StudentArgsSchema: z.ZodType<Prisma.StudentDefaultArgs> = z.object({
  select: z.lazy(() => StudentSelectSchema).optional(),
  include: z.lazy(() => StudentIncludeSchema).optional(),
}).strict();

export const StudentCountOutputTypeArgsSchema: z.ZodType<Prisma.StudentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => StudentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const StudentCountOutputTypeSelectSchema: z.ZodType<Prisma.StudentCountOutputTypeSelect> = z.object({
  ContactData: z.boolean().optional(),
  Payment: z.boolean().optional(),
  Event: z.boolean().optional(),
}).strict();

export const StudentSelectSchema: z.ZodType<Prisma.StudentSelect> = z.object({
  id: z.boolean().optional(),
  firstname: z.boolean().optional(),
  surename: z.boolean().optional(),
  class: z.boolean().optional(),
  extendedMath: z.boolean().optional(),
  description: z.boolean().optional(),
  defaultPrice: z.boolean().optional(),
  balance: z.boolean().optional(),
  isActive: z.boolean().optional(),
  ContactData: z.union([z.boolean(),z.lazy(() => ContactDataFindManyArgsSchema)]).optional(),
  Payment: z.union([z.boolean(),z.lazy(() => PaymentFindManyArgsSchema)]).optional(),
  Event: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StudentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTACT DATA
//------------------------------------------------------

export const ContactDataIncludeSchema: z.ZodType<Prisma.ContactDataInclude> = z.object({
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

export const ContactDataArgsSchema: z.ZodType<Prisma.ContactDataDefaultArgs> = z.object({
  select: z.lazy(() => ContactDataSelectSchema).optional(),
  include: z.lazy(() => ContactDataIncludeSchema).optional(),
}).strict();

export const ContactDataSelectSchema: z.ZodType<Prisma.ContactDataSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  value: z.boolean().optional(),
  studentId: z.boolean().optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

// PAYMENT
//------------------------------------------------------

export const PaymentIncludeSchema: z.ZodType<Prisma.PaymentInclude> = z.object({
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

export const PaymentArgsSchema: z.ZodType<Prisma.PaymentDefaultArgs> = z.object({
  select: z.lazy(() => PaymentSelectSchema).optional(),
  include: z.lazy(() => PaymentIncludeSchema).optional(),
}).strict();

export const PaymentSelectSchema: z.ZodType<Prisma.PaymentSelect> = z.object({
  id: z.boolean().optional(),
  studentId: z.boolean().optional(),
  price: z.boolean().optional(),
  date: z.boolean().optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  eventSeries: z.union([z.boolean(),z.lazy(() => EventSeriesArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.boolean().optional(),
  eventSeriesId: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  startHour: z.boolean().optional(),
  endHour: z.boolean().optional(),
  price: z.boolean().optional(),
  isPaid: z.boolean().optional(),
  studentId: z.boolean().optional(),
  eventSeries: z.union([z.boolean(),z.lazy(() => EventSeriesArgsSchema)]).optional(),
  student: z.union([z.boolean(),z.lazy(() => StudentArgsSchema)]).optional(),
}).strict()

// EVENT SERIES
//------------------------------------------------------

export const EventSeriesIncludeSchema: z.ZodType<Prisma.EventSeriesInclude> = z.object({
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventSeriesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventSeriesArgsSchema: z.ZodType<Prisma.EventSeriesDefaultArgs> = z.object({
  select: z.lazy(() => EventSeriesSelectSchema).optional(),
  include: z.lazy(() => EventSeriesIncludeSchema).optional(),
}).strict();

export const EventSeriesCountOutputTypeArgsSchema: z.ZodType<Prisma.EventSeriesCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventSeriesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventSeriesCountOutputTypeSelectSchema: z.ZodType<Prisma.EventSeriesCountOutputTypeSelect> = z.object({
  events: z.boolean().optional(),
}).strict();

export const EventSeriesSelectSchema: z.ZodType<Prisma.EventSeriesSelect> = z.object({
  id: z.boolean().optional(),
  type: z.boolean().optional(),
  pattern: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  isCanceled: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  startHour: z.boolean().optional(),
  endHour: z.boolean().optional(),
  events: z.union([z.boolean(),z.lazy(() => EventFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventSeriesCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const StudentWhereInputSchema: z.ZodType<Prisma.StudentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  firstname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  surename: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  class: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  extendedMath: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultPrice: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ContactData: z.lazy(() => ContactDataListRelationFilterSchema).optional(),
  Payment: z.lazy(() => PaymentListRelationFilterSchema).optional(),
  Event: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const StudentOrderByWithRelationInputSchema: z.ZodType<Prisma.StudentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  surename: z.lazy(() => SortOrderSchema).optional(),
  class: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  extendedMath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  defaultPrice: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  ContactData: z.lazy(() => ContactDataOrderByRelationAggregateInputSchema).optional(),
  Payment: z.lazy(() => PaymentOrderByRelationAggregateInputSchema).optional(),
  Event: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const StudentWhereUniqueInputSchema: z.ZodType<Prisma.StudentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentWhereInputSchema),z.lazy(() => StudentWhereInputSchema).array() ]).optional(),
  firstname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  surename: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  class: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  extendedMath: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultPrice: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  ContactData: z.lazy(() => ContactDataListRelationFilterSchema).optional(),
  Payment: z.lazy(() => PaymentListRelationFilterSchema).optional(),
  Event: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const StudentOrderByWithAggregationInputSchema: z.ZodType<Prisma.StudentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  surename: z.lazy(() => SortOrderSchema).optional(),
  class: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  extendedMath: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  defaultPrice: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StudentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StudentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StudentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StudentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StudentSumOrderByAggregateInputSchema).optional()
}).strict();

export const StudentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StudentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StudentScalarWhereWithAggregatesInputSchema),z.lazy(() => StudentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  firstname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  surename: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  class: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  extendedMath: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  defaultPrice: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  balance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ContactDataWhereInputSchema: z.ZodType<Prisma.ContactDataWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactDataWhereInputSchema),z.lazy(() => ContactDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactDataWhereInputSchema),z.lazy(() => ContactDataWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumContactTypeFilterSchema),z.lazy(() => ContactTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  student: z.union([ z.lazy(() => StudentRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
}).strict();

export const ContactDataOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactDataOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional()
}).strict();

export const ContactDataWhereUniqueInputSchema: z.ZodType<Prisma.ContactDataWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ContactDataWhereInputSchema),z.lazy(() => ContactDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactDataWhereInputSchema),z.lazy(() => ContactDataWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumContactTypeFilterSchema),z.lazy(() => ContactTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  student: z.union([ z.lazy(() => StudentRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
}).strict());

export const ContactDataOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContactDataOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContactDataCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ContactDataAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContactDataMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContactDataMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ContactDataSumOrderByAggregateInputSchema).optional()
}).strict();

export const ContactDataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContactDataScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContactDataScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactDataScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactDataScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumContactTypeWithAggregatesFilterSchema),z.lazy(() => ContactTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const PaymentWhereInputSchema: z.ZodType<Prisma.PaymentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  student: z.union([ z.lazy(() => StudentRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
}).strict();

export const PaymentOrderByWithRelationInputSchema: z.ZodType<Prisma.PaymentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional()
}).strict();

export const PaymentWhereUniqueInputSchema: z.ZodType<Prisma.PaymentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentWhereInputSchema),z.lazy(() => PaymentWhereInputSchema).array() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  student: z.union([ z.lazy(() => StudentRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional(),
}).strict());

export const PaymentOrderByWithAggregationInputSchema: z.ZodType<Prisma.PaymentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PaymentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PaymentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PaymentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PaymentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PaymentSumOrderByAggregateInputSchema).optional()
}).strict();

export const PaymentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PaymentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema),z.lazy(() => PaymentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isCanceled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isOverridden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumEventTypeFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventSeriesId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  isPaid: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  studentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  eventSeries: z.union([ z.lazy(() => EventSeriesNullableRelationFilterSchema),z.lazy(() => EventSeriesWhereInputSchema) ]).optional().nullable(),
  student: z.union([ z.lazy(() => StudentNullableRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional().nullable(),
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  isOverridden: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  eventSeriesId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPaid: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  studentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eventSeries: z.lazy(() => EventSeriesOrderByWithRelationInputSchema).optional(),
  student: z.lazy(() => StudentOrderByWithRelationInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isCanceled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isOverridden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumEventTypeFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventSeriesId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  isPaid: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  studentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  eventSeries: z.union([ z.lazy(() => EventSeriesNullableRelationFilterSchema),z.lazy(() => EventSeriesWhereInputSchema) ]).optional().nullable(),
  student: z.union([ z.lazy(() => StudentNullableRelationFilterSchema),z.lazy(() => StudentWhereInputSchema) ]).optional().nullable(),
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  isOverridden: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  eventSeriesId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPaid: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  studentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isCanceled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isOverridden: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumEventTypeWithAggregatesFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventSeriesId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  startHour: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  endHour: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  isPaid: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  studentId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const EventSeriesWhereInputSchema: z.ZodType<Prisma.EventSeriesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventSeriesWhereInputSchema),z.lazy(() => EventSeriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventSeriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventSeriesWhereInputSchema),z.lazy(() => EventSeriesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumEventSeriesTypeFilterSchema),z.lazy(() => EventSeriesTypeSchema) ]).optional(),
  pattern: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isCanceled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict();

export const EventSeriesOrderByWithRelationInputSchema: z.ZodType<Prisma.EventSeriesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  pattern: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  events: z.lazy(() => EventOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventSeriesWhereUniqueInputSchema: z.ZodType<Prisma.EventSeriesWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => EventSeriesWhereInputSchema),z.lazy(() => EventSeriesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventSeriesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventSeriesWhereInputSchema),z.lazy(() => EventSeriesWhereInputSchema).array() ]).optional(),
  type: z.union([ z.lazy(() => EnumEventSeriesTypeFilterSchema),z.lazy(() => EventSeriesTypeSchema) ]).optional(),
  pattern: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  isCanceled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  events: z.lazy(() => EventListRelationFilterSchema).optional()
}).strict());

export const EventSeriesOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventSeriesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  pattern: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endHour: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => EventSeriesCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => EventSeriesAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventSeriesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventSeriesMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => EventSeriesSumOrderByAggregateInputSchema).optional()
}).strict();

export const EventSeriesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventSeriesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventSeriesScalarWhereWithAggregatesInputSchema),z.lazy(() => EventSeriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventSeriesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventSeriesScalarWhereWithAggregatesInputSchema),z.lazy(() => EventSeriesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumEventSeriesTypeWithAggregatesFilterSchema),z.lazy(() => EventSeriesTypeSchema) ]).optional(),
  pattern: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  startDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  isCanceled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  startHour: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  endHour: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const StudentCreateInputSchema: z.ZodType<Prisma.StudentCreateInput> = z.object({
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  ContactData: z.lazy(() => ContactDataCreateNestedManyWithoutStudentInputSchema).optional(),
  Payment: z.lazy(() => PaymentCreateNestedManyWithoutStudentInputSchema).optional(),
  Event: z.lazy(() => EventCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateInputSchema: z.ZodType<Prisma.StudentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  ContactData: z.lazy(() => ContactDataUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  Payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUpdateInputSchema: z.ZodType<Prisma.StudentUpdateInput> = z.object({
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContactData: z.lazy(() => ContactDataUpdateManyWithoutStudentNestedInputSchema).optional(),
  Payment: z.lazy(() => PaymentUpdateManyWithoutStudentNestedInputSchema).optional(),
  Event: z.lazy(() => EventUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContactData: z.lazy(() => ContactDataUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  Payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentCreateManyInputSchema: z.ZodType<Prisma.StudentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional()
}).strict();

export const StudentUpdateManyMutationInputSchema: z.ZodType<Prisma.StudentUpdateManyMutationInput> = z.object({
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StudentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactDataCreateInputSchema: z.ZodType<Prisma.ContactDataCreateInput> = z.object({
  type: z.lazy(() => ContactTypeSchema),
  value: z.string(),
  student: z.lazy(() => StudentCreateNestedOneWithoutContactDataInputSchema)
}).strict();

export const ContactDataUncheckedCreateInputSchema: z.ZodType<Prisma.ContactDataUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => ContactTypeSchema),
  value: z.string(),
  studentId: z.number().int()
}).strict();

export const ContactDataUpdateInputSchema: z.ZodType<Prisma.ContactDataUpdateInput> = z.object({
  type: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => EnumContactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutContactDataNestedInputSchema).optional()
}).strict();

export const ContactDataUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactDataUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => EnumContactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactDataCreateManyInputSchema: z.ZodType<Prisma.ContactDataCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => ContactTypeSchema),
  value: z.string(),
  studentId: z.number().int()
}).strict();

export const ContactDataUpdateManyMutationInputSchema: z.ZodType<Prisma.ContactDataUpdateManyMutationInput> = z.object({
  type: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => EnumContactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactDataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContactDataUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => EnumContactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentCreateInputSchema: z.ZodType<Prisma.PaymentCreateInput> = z.object({
  price: z.number().int(),
  date: z.coerce.date(),
  student: z.lazy(() => StudentCreateNestedOneWithoutPaymentInputSchema)
}).strict();

export const PaymentUncheckedCreateInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  price: z.number().int(),
  date: z.coerce.date()
}).strict();

export const PaymentUpdateInputSchema: z.ZodType<Prisma.PaymentUpdateInput> = z.object({
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  student: z.lazy(() => StudentUpdateOneRequiredWithoutPaymentNestedInputSchema).optional()
}).strict();

export const PaymentUncheckedUpdateInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentCreateManyInputSchema: z.ZodType<Prisma.PaymentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  studentId: z.number().int(),
  price: z.number().int(),
  date: z.coerce.date()
}).strict();

export const PaymentUpdateManyMutationInputSchema: z.ZodType<Prisma.PaymentUpdateManyMutationInput> = z.object({
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  studentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable(),
  eventSeries: z.lazy(() => EventSeriesCreateNestedOneWithoutEventsInputSchema).optional(),
  student: z.lazy(() => StudentCreateNestedOneWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  eventSeriesId: z.number().int().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable(),
  studentId: z.number().int().optional().nullable()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventSeries: z.lazy(() => EventSeriesUpdateOneWithoutEventsNestedInputSchema).optional(),
  student: z.lazy(() => StudentUpdateOneWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventSeriesId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  eventSeriesId: z.number().int().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable(),
  studentId: z.number().int().optional().nullable()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventSeriesId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventSeriesCreateInputSchema: z.ZodType<Prisma.EventSeriesCreateInput> = z.object({
  type: z.lazy(() => EventSeriesTypeSchema),
  pattern: z.string().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isCanceled: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  events: z.lazy(() => EventCreateNestedManyWithoutEventSeriesInputSchema).optional()
}).strict();

export const EventSeriesUncheckedCreateInputSchema: z.ZodType<Prisma.EventSeriesUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => EventSeriesTypeSchema),
  pattern: z.string().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isCanceled: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  events: z.lazy(() => EventUncheckedCreateNestedManyWithoutEventSeriesInputSchema).optional()
}).strict();

export const EventSeriesUpdateInputSchema: z.ZodType<Prisma.EventSeriesUpdateInput> = z.object({
  type: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => EnumEventSeriesTypeFieldUpdateOperationsInputSchema) ]).optional(),
  pattern: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  events: z.lazy(() => EventUpdateManyWithoutEventSeriesNestedInputSchema).optional()
}).strict();

export const EventSeriesUncheckedUpdateInputSchema: z.ZodType<Prisma.EventSeriesUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => EnumEventSeriesTypeFieldUpdateOperationsInputSchema) ]).optional(),
  pattern: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  events: z.lazy(() => EventUncheckedUpdateManyWithoutEventSeriesNestedInputSchema).optional()
}).strict();

export const EventSeriesCreateManyInputSchema: z.ZodType<Prisma.EventSeriesCreateManyInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => EventSeriesTypeSchema),
  pattern: z.string().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isCanceled: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable()
}).strict();

export const EventSeriesUpdateManyMutationInputSchema: z.ZodType<Prisma.EventSeriesUpdateManyMutationInput> = z.object({
  type: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => EnumEventSeriesTypeFieldUpdateOperationsInputSchema) ]).optional(),
  pattern: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventSeriesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventSeriesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => EnumEventSeriesTypeFieldUpdateOperationsInputSchema) ]).optional(),
  pattern: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const ContactDataListRelationFilterSchema: z.ZodType<Prisma.ContactDataListRelationFilter> = z.object({
  every: z.lazy(() => ContactDataWhereInputSchema).optional(),
  some: z.lazy(() => ContactDataWhereInputSchema).optional(),
  none: z.lazy(() => ContactDataWhereInputSchema).optional()
}).strict();

export const PaymentListRelationFilterSchema: z.ZodType<Prisma.PaymentListRelationFilter> = z.object({
  every: z.lazy(() => PaymentWhereInputSchema).optional(),
  some: z.lazy(() => PaymentWhereInputSchema).optional(),
  none: z.lazy(() => PaymentWhereInputSchema).optional()
}).strict();

export const EventListRelationFilterSchema: z.ZodType<Prisma.EventListRelationFilter> = z.object({
  every: z.lazy(() => EventWhereInputSchema).optional(),
  some: z.lazy(() => EventWhereInputSchema).optional(),
  none: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ContactDataOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContactDataOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PaymentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EventOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentCountOrderByAggregateInputSchema: z.ZodType<Prisma.StudentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  surename: z.lazy(() => SortOrderSchema).optional(),
  class: z.lazy(() => SortOrderSchema).optional(),
  extendedMath: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  defaultPrice: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StudentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  defaultPrice: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  surename: z.lazy(() => SortOrderSchema).optional(),
  class: z.lazy(() => SortOrderSchema).optional(),
  extendedMath: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  defaultPrice: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentMinOrderByAggregateInputSchema: z.ZodType<Prisma.StudentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstname: z.lazy(() => SortOrderSchema).optional(),
  surename: z.lazy(() => SortOrderSchema).optional(),
  class: z.lazy(() => SortOrderSchema).optional(),
  extendedMath: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  defaultPrice: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StudentSumOrderByAggregateInputSchema: z.ZodType<Prisma.StudentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  defaultPrice: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const EnumContactTypeFilterSchema: z.ZodType<Prisma.EnumContactTypeFilter> = z.object({
  equals: z.lazy(() => ContactTypeSchema).optional(),
  in: z.lazy(() => ContactTypeSchema).array().optional(),
  notIn: z.lazy(() => ContactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => NestedEnumContactTypeFilterSchema) ]).optional(),
}).strict();

export const StudentRelationFilterSchema: z.ZodType<Prisma.StudentRelationFilter> = z.object({
  is: z.lazy(() => StudentWhereInputSchema).optional(),
  isNot: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const ContactDataCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContactDataCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactDataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ContactDataAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactDataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContactDataMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactDataMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContactDataMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactDataSumOrderByAggregateInputSchema: z.ZodType<Prisma.ContactDataSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumContactTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumContactTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ContactTypeSchema).optional(),
  in: z.lazy(() => ContactTypeSchema).array().optional(),
  notIn: z.lazy(() => ContactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => NestedEnumContactTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContactTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContactTypeFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PaymentCountOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentMinOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PaymentSumOrderByAggregateInputSchema: z.ZodType<Prisma.PaymentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumEventTypeFilterSchema: z.ZodType<Prisma.EnumEventTypeFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EventSeriesNullableRelationFilterSchema: z.ZodType<Prisma.EventSeriesNullableRelationFilter> = z.object({
  is: z.lazy(() => EventSeriesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => EventSeriesWhereInputSchema).optional().nullable()
}).strict();

export const StudentNullableRelationFilterSchema: z.ZodType<Prisma.StudentNullableRelationFilter> = z.object({
  is: z.lazy(() => StudentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => StudentWhereInputSchema).optional().nullable()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  isOverridden: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  eventSeriesId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventSeriesId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  isOverridden: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  eventSeriesId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  isOverridden: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  eventSeriesId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  isPaid: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventSeriesId: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  studentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEventTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEventTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventTypeFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const EnumEventSeriesTypeFilterSchema: z.ZodType<Prisma.EnumEventSeriesTypeFilter> = z.object({
  equals: z.lazy(() => EventSeriesTypeSchema).optional(),
  in: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  notIn: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => NestedEnumEventSeriesTypeFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EventSeriesCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventSeriesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  pattern: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSeriesAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventSeriesAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSeriesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventSeriesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  pattern: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSeriesMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventSeriesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  pattern: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  isCanceled: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startHour: z.lazy(() => SortOrderSchema).optional(),
  endHour: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventSeriesSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventSeriesSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumEventSeriesTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumEventSeriesTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventSeriesTypeSchema).optional(),
  in: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  notIn: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => NestedEnumEventSeriesTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventSeriesTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventSeriesTypeFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const ContactDataCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => ContactDataCreateWithoutStudentInputSchema),z.lazy(() => ContactDataCreateWithoutStudentInputSchema).array(),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema),z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactDataCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PaymentCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.PaymentCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutStudentInputSchema),z.lazy(() => PaymentCreateWithoutStudentInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutStudentInputSchema),z.lazy(() => EventCreateWithoutStudentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema),z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContactDataUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => ContactDataCreateWithoutStudentInputSchema),z.lazy(() => ContactDataCreateWithoutStudentInputSchema).array(),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema),z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactDataCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PaymentUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutStudentInputSchema),z.lazy(() => PaymentCreateWithoutStudentInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutStudentInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutStudentInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutStudentInputSchema),z.lazy(() => EventCreateWithoutStudentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema),z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyStudentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const ContactDataUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.ContactDataUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactDataCreateWithoutStudentInputSchema),z.lazy(() => ContactDataCreateWithoutStudentInputSchema).array(),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema),z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactDataUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => ContactDataUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactDataCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactDataUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => ContactDataUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactDataUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => ContactDataUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactDataScalarWhereInputSchema),z.lazy(() => ContactDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PaymentUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.PaymentUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutStudentInputSchema),z.lazy(() => PaymentCreateWithoutStudentInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PaymentUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PaymentUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PaymentUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PaymentUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => PaymentUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutStudentInputSchema),z.lazy(() => EventCreateWithoutStudentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema),z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ContactDataUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.ContactDataUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContactDataCreateWithoutStudentInputSchema),z.lazy(() => ContactDataCreateWithoutStudentInputSchema).array(),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema),z.lazy(() => ContactDataCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContactDataUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => ContactDataUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContactDataCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContactDataWhereUniqueInputSchema),z.lazy(() => ContactDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContactDataUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => ContactDataUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContactDataUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => ContactDataUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContactDataScalarWhereInputSchema),z.lazy(() => ContactDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PaymentUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PaymentCreateWithoutStudentInputSchema),z.lazy(() => PaymentCreateWithoutStudentInputSchema).array(),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema),z.lazy(() => PaymentCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PaymentUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PaymentUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PaymentCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PaymentWhereUniqueInputSchema),z.lazy(() => PaymentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PaymentUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => PaymentUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PaymentUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => PaymentUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutStudentNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutStudentNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutStudentInputSchema),z.lazy(() => EventCreateWithoutStudentInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema),z.lazy(() => EventCreateOrConnectWithoutStudentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyStudentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutStudentInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutStudentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutStudentInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutStudentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StudentCreateNestedOneWithoutContactDataInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutContactDataInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutContactDataInputSchema),z.lazy(() => StudentUncheckedCreateWithoutContactDataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutContactDataInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const EnumContactTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumContactTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ContactTypeSchema).optional()
}).strict();

export const StudentUpdateOneRequiredWithoutContactDataNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneRequiredWithoutContactDataNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutContactDataInputSchema),z.lazy(() => StudentUncheckedCreateWithoutContactDataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutContactDataInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutContactDataInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutContactDataInputSchema),z.lazy(() => StudentUpdateWithoutContactDataInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutContactDataInputSchema) ]).optional(),
}).strict();

export const StudentCreateNestedOneWithoutPaymentInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutPaymentInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutPaymentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const StudentUpdateOneRequiredWithoutPaymentNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneRequiredWithoutPaymentNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutPaymentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPaymentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutPaymentInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutPaymentInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutPaymentInputSchema),z.lazy(() => StudentUpdateWithoutPaymentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutPaymentInputSchema) ]).optional(),
}).strict();

export const EventSeriesCreateNestedOneWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesCreateNestedOneWithoutEventsInput> = z.object({
  create: z.union([ z.lazy(() => EventSeriesCreateWithoutEventsInputSchema),z.lazy(() => EventSeriesUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventSeriesCreateOrConnectWithoutEventsInputSchema).optional(),
  connect: z.lazy(() => EventSeriesWhereUniqueInputSchema).optional()
}).strict();

export const StudentCreateNestedOneWithoutEventInputSchema: z.ZodType<Prisma.StudentCreateNestedOneWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutEventInputSchema),z.lazy(() => StudentUncheckedCreateWithoutEventInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutEventInputSchema).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional()
}).strict();

export const EnumEventTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEventTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EventTypeSchema).optional()
}).strict();

export const EventSeriesUpdateOneWithoutEventsNestedInputSchema: z.ZodType<Prisma.EventSeriesUpdateOneWithoutEventsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventSeriesCreateWithoutEventsInputSchema),z.lazy(() => EventSeriesUncheckedCreateWithoutEventsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventSeriesCreateOrConnectWithoutEventsInputSchema).optional(),
  upsert: z.lazy(() => EventSeriesUpsertWithoutEventsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => EventSeriesWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => EventSeriesWhereInputSchema) ]).optional(),
  connect: z.lazy(() => EventSeriesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventSeriesUpdateToOneWithWhereWithoutEventsInputSchema),z.lazy(() => EventSeriesUpdateWithoutEventsInputSchema),z.lazy(() => EventSeriesUncheckedUpdateWithoutEventsInputSchema) ]).optional(),
}).strict();

export const StudentUpdateOneWithoutEventNestedInputSchema: z.ZodType<Prisma.StudentUpdateOneWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => StudentCreateWithoutEventInputSchema),z.lazy(() => StudentUncheckedCreateWithoutEventInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StudentCreateOrConnectWithoutEventInputSchema).optional(),
  upsert: z.lazy(() => StudentUpsertWithoutEventInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => StudentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => StudentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StudentUpdateToOneWithWhereWithoutEventInputSchema),z.lazy(() => StudentUpdateWithoutEventInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutEventInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EventCreateNestedManyWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventCreateNestedManyWithoutEventSeriesInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventSeriesInputSchema),z.lazy(() => EventCreateWithoutEventSeriesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema),z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyEventSeriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedCreateNestedManyWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutEventSeriesInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventSeriesInputSchema),z.lazy(() => EventCreateWithoutEventSeriesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema),z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyEventSeriesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumEventSeriesTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumEventSeriesTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => EventSeriesTypeSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const EventUpdateManyWithoutEventSeriesNestedInputSchema: z.ZodType<Prisma.EventUpdateManyWithoutEventSeriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventSeriesInputSchema),z.lazy(() => EventCreateWithoutEventSeriesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema),z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutEventSeriesInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutEventSeriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyEventSeriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutEventSeriesInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutEventSeriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutEventSeriesInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutEventSeriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventUncheckedUpdateManyWithoutEventSeriesNestedInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutEventSeriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutEventSeriesInputSchema),z.lazy(() => EventCreateWithoutEventSeriesInputSchema).array(),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema),z.lazy(() => EventCreateOrConnectWithoutEventSeriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EventUpsertWithWhereUniqueWithoutEventSeriesInputSchema),z.lazy(() => EventUpsertWithWhereUniqueWithoutEventSeriesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EventCreateManyEventSeriesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EventWhereUniqueInputSchema),z.lazy(() => EventWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithWhereUniqueWithoutEventSeriesInputSchema),z.lazy(() => EventUpdateWithWhereUniqueWithoutEventSeriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EventUpdateManyWithWhereWithoutEventSeriesInputSchema),z.lazy(() => EventUpdateManyWithWhereWithoutEventSeriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumContactTypeFilterSchema: z.ZodType<Prisma.NestedEnumContactTypeFilter> = z.object({
  equals: z.lazy(() => ContactTypeSchema).optional(),
  in: z.lazy(() => ContactTypeSchema).array().optional(),
  notIn: z.lazy(() => ContactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => NestedEnumContactTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumContactTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumContactTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ContactTypeSchema).optional(),
  in: z.lazy(() => ContactTypeSchema).array().optional(),
  notIn: z.lazy(() => ContactTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => NestedEnumContactTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContactTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContactTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumEventTypeFilterSchema: z.ZodType<Prisma.NestedEnumEventTypeFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumEventTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEventTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventTypeSchema).optional(),
  in: z.lazy(() => EventTypeSchema).array().optional(),
  notIn: z.lazy(() => EventTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => NestedEnumEventTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventTypeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedEnumEventSeriesTypeFilterSchema: z.ZodType<Prisma.NestedEnumEventSeriesTypeFilter> = z.object({
  equals: z.lazy(() => EventSeriesTypeSchema).optional(),
  in: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  notIn: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => NestedEnumEventSeriesTypeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumEventSeriesTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumEventSeriesTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => EventSeriesTypeSchema).optional(),
  in: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  notIn: z.lazy(() => EventSeriesTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => NestedEnumEventSeriesTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumEventSeriesTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumEventSeriesTypeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const ContactDataCreateWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataCreateWithoutStudentInput> = z.object({
  type: z.lazy(() => ContactTypeSchema),
  value: z.string()
}).strict();

export const ContactDataUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUncheckedCreateWithoutStudentInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => ContactTypeSchema),
  value: z.string()
}).strict();

export const ContactDataCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => ContactDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContactDataCreateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const ContactDataCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.ContactDataCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContactDataCreateManyStudentInputSchema),z.lazy(() => ContactDataCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PaymentCreateWithoutStudentInputSchema: z.ZodType<Prisma.PaymentCreateWithoutStudentInput> = z.object({
  price: z.number().int(),
  date: z.coerce.date()
}).strict();

export const PaymentUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUncheckedCreateWithoutStudentInput> = z.object({
  id: z.number().int().optional(),
  price: z.number().int(),
  date: z.coerce.date()
}).strict();

export const PaymentCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.PaymentCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PaymentCreateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const PaymentCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.PaymentCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PaymentCreateManyStudentInputSchema),z.lazy(() => PaymentCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventCreateWithoutStudentInputSchema: z.ZodType<Prisma.EventCreateWithoutStudentInput> = z.object({
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable(),
  eventSeries: z.lazy(() => EventSeriesCreateNestedOneWithoutEventsInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutStudentInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutStudentInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  eventSeriesId: z.number().int().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable()
}).strict();

export const EventCreateOrConnectWithoutStudentInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutStudentInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutStudentInputSchema),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const EventCreateManyStudentInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyStudentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyStudentInputSchema),z.lazy(() => EventCreateManyStudentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ContactDataUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => ContactDataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContactDataUpdateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => ContactDataCreateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const ContactDataUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => ContactDataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContactDataUpdateWithoutStudentInputSchema),z.lazy(() => ContactDataUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const ContactDataUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => ContactDataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContactDataUpdateManyMutationInputSchema),z.lazy(() => ContactDataUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const ContactDataScalarWhereInputSchema: z.ZodType<Prisma.ContactDataScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactDataScalarWhereInputSchema),z.lazy(() => ContactDataScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactDataScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactDataScalarWhereInputSchema),z.lazy(() => ContactDataScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumContactTypeFilterSchema),z.lazy(() => ContactTypeSchema) ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const PaymentUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PaymentUpdateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => PaymentCreateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const PaymentUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => PaymentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PaymentUpdateWithoutStudentInputSchema),z.lazy(() => PaymentUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const PaymentUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => PaymentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PaymentUpdateManyMutationInputSchema),z.lazy(() => PaymentUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const PaymentScalarWhereInputSchema: z.ZodType<Prisma.PaymentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PaymentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PaymentScalarWhereInputSchema),z.lazy(() => PaymentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  studentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventUpsertWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutStudentInputSchema),z.lazy(() => EventUncheckedUpdateWithoutStudentInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutStudentInputSchema),z.lazy(() => EventUncheckedCreateWithoutStudentInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutStudentInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutStudentInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutStudentInputSchema),z.lazy(() => EventUncheckedUpdateWithoutStudentInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutStudentInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutStudentInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutStudentInputSchema) ]),
}).strict();

export const EventScalarWhereInputSchema: z.ZodType<Prisma.EventScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereInputSchema),z.lazy(() => EventScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isCanceled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isOverridden: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  type: z.union([ z.lazy(() => EnumEventTypeFilterSchema),z.lazy(() => EventTypeSchema) ]).optional(),
  eventSeriesId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  endHour: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  isPaid: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  studentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const StudentCreateWithoutContactDataInputSchema: z.ZodType<Prisma.StudentCreateWithoutContactDataInput> = z.object({
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  Payment: z.lazy(() => PaymentCreateNestedManyWithoutStudentInputSchema).optional(),
  Event: z.lazy(() => EventCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateWithoutContactDataInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutContactDataInput> = z.object({
  id: z.number().int().optional(),
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  Payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutContactDataInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutContactDataInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutContactDataInputSchema),z.lazy(() => StudentUncheckedCreateWithoutContactDataInputSchema) ]),
}).strict();

export const StudentUpsertWithoutContactDataInputSchema: z.ZodType<Prisma.StudentUpsertWithoutContactDataInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutContactDataInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutContactDataInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutContactDataInputSchema),z.lazy(() => StudentUncheckedCreateWithoutContactDataInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutContactDataInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutContactDataInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutContactDataInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutContactDataInputSchema) ]),
}).strict();

export const StudentUpdateWithoutContactDataInputSchema: z.ZodType<Prisma.StudentUpdateWithoutContactDataInput> = z.object({
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Payment: z.lazy(() => PaymentUpdateManyWithoutStudentNestedInputSchema).optional(),
  Event: z.lazy(() => EventUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutContactDataInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutContactDataInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  Payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentCreateWithoutPaymentInputSchema: z.ZodType<Prisma.StudentCreateWithoutPaymentInput> = z.object({
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  ContactData: z.lazy(() => ContactDataCreateNestedManyWithoutStudentInputSchema).optional(),
  Event: z.lazy(() => EventCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateWithoutPaymentInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutPaymentInput> = z.object({
  id: z.number().int().optional(),
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  ContactData: z.lazy(() => ContactDataUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutPaymentInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutPaymentInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutPaymentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPaymentInputSchema) ]),
}).strict();

export const StudentUpsertWithoutPaymentInputSchema: z.ZodType<Prisma.StudentUpsertWithoutPaymentInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutPaymentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutPaymentInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutPaymentInputSchema),z.lazy(() => StudentUncheckedCreateWithoutPaymentInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutPaymentInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutPaymentInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutPaymentInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutPaymentInputSchema) ]),
}).strict();

export const StudentUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.StudentUpdateWithoutPaymentInput> = z.object({
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContactData: z.lazy(() => ContactDataUpdateManyWithoutStudentNestedInputSchema).optional(),
  Event: z.lazy(() => EventUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutPaymentInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutPaymentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContactData: z.lazy(() => ContactDataUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  Event: z.lazy(() => EventUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const EventSeriesCreateWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesCreateWithoutEventsInput> = z.object({
  type: z.lazy(() => EventSeriesTypeSchema),
  pattern: z.string().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isCanceled: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable()
}).strict();

export const EventSeriesUncheckedCreateWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesUncheckedCreateWithoutEventsInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => EventSeriesTypeSchema),
  pattern: z.string().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  isCanceled: z.boolean().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable()
}).strict();

export const EventSeriesCreateOrConnectWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesCreateOrConnectWithoutEventsInput> = z.object({
  where: z.lazy(() => EventSeriesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventSeriesCreateWithoutEventsInputSchema),z.lazy(() => EventSeriesUncheckedCreateWithoutEventsInputSchema) ]),
}).strict();

export const StudentCreateWithoutEventInputSchema: z.ZodType<Prisma.StudentCreateWithoutEventInput> = z.object({
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  ContactData: z.lazy(() => ContactDataCreateNestedManyWithoutStudentInputSchema).optional(),
  Payment: z.lazy(() => PaymentCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.StudentUncheckedCreateWithoutEventInput> = z.object({
  id: z.number().int().optional(),
  firstname: z.string(),
  surename: z.string(),
  class: z.string().optional().nullable(),
  extendedMath: z.boolean().optional().nullable(),
  description: z.string().optional().nullable(),
  defaultPrice: z.number().optional().nullable(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
  ContactData: z.lazy(() => ContactDataUncheckedCreateNestedManyWithoutStudentInputSchema).optional(),
  Payment: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutStudentInputSchema).optional()
}).strict();

export const StudentCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.StudentCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => StudentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StudentCreateWithoutEventInputSchema),z.lazy(() => StudentUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const EventSeriesUpsertWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesUpsertWithoutEventsInput> = z.object({
  update: z.union([ z.lazy(() => EventSeriesUpdateWithoutEventsInputSchema),z.lazy(() => EventSeriesUncheckedUpdateWithoutEventsInputSchema) ]),
  create: z.union([ z.lazy(() => EventSeriesCreateWithoutEventsInputSchema),z.lazy(() => EventSeriesUncheckedCreateWithoutEventsInputSchema) ]),
  where: z.lazy(() => EventSeriesWhereInputSchema).optional()
}).strict();

export const EventSeriesUpdateToOneWithWhereWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesUpdateToOneWithWhereWithoutEventsInput> = z.object({
  where: z.lazy(() => EventSeriesWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventSeriesUpdateWithoutEventsInputSchema),z.lazy(() => EventSeriesUncheckedUpdateWithoutEventsInputSchema) ]),
}).strict();

export const EventSeriesUpdateWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesUpdateWithoutEventsInput> = z.object({
  type: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => EnumEventSeriesTypeFieldUpdateOperationsInputSchema) ]).optional(),
  pattern: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventSeriesUncheckedUpdateWithoutEventsInputSchema: z.ZodType<Prisma.EventSeriesUncheckedUpdateWithoutEventsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventSeriesTypeSchema),z.lazy(() => EnumEventSeriesTypeFieldUpdateOperationsInputSchema) ]).optional(),
  pattern: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StudentUpsertWithoutEventInputSchema: z.ZodType<Prisma.StudentUpsertWithoutEventInput> = z.object({
  update: z.union([ z.lazy(() => StudentUpdateWithoutEventInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => StudentCreateWithoutEventInputSchema),z.lazy(() => StudentUncheckedCreateWithoutEventInputSchema) ]),
  where: z.lazy(() => StudentWhereInputSchema).optional()
}).strict();

export const StudentUpdateToOneWithWhereWithoutEventInputSchema: z.ZodType<Prisma.StudentUpdateToOneWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => StudentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StudentUpdateWithoutEventInputSchema),z.lazy(() => StudentUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const StudentUpdateWithoutEventInputSchema: z.ZodType<Prisma.StudentUpdateWithoutEventInput> = z.object({
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContactData: z.lazy(() => ContactDataUpdateManyWithoutStudentNestedInputSchema).optional(),
  Payment: z.lazy(() => PaymentUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const StudentUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.StudentUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  firstname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surename: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  class: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  extendedMath: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultPrice: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  ContactData: z.lazy(() => ContactDataUncheckedUpdateManyWithoutStudentNestedInputSchema).optional(),
  Payment: z.lazy(() => PaymentUncheckedUpdateManyWithoutStudentNestedInputSchema).optional()
}).strict();

export const EventCreateWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventCreateWithoutEventSeriesInput> = z.object({
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable(),
  student: z.lazy(() => StudentCreateNestedOneWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutEventSeriesInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable(),
  studentId: z.number().int().optional().nullable()
}).strict();

export const EventCreateOrConnectWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutEventSeriesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema) ]),
}).strict();

export const EventCreateManyEventSeriesInputEnvelopeSchema: z.ZodType<Prisma.EventCreateManyEventSeriesInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EventCreateManyEventSeriesInputSchema),z.lazy(() => EventCreateManyEventSeriesInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventUpsertWithWhereUniqueWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutEventSeriesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EventUpdateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventSeriesInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedCreateWithoutEventSeriesInputSchema) ]),
}).strict();

export const EventUpdateWithWhereUniqueWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutEventSeriesInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EventUpdateWithoutEventSeriesInputSchema),z.lazy(() => EventUncheckedUpdateWithoutEventSeriesInputSchema) ]),
}).strict();

export const EventUpdateManyWithWhereWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutEventSeriesInput> = z.object({
  where: z.lazy(() => EventScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EventUpdateManyMutationInputSchema),z.lazy(() => EventUncheckedUpdateManyWithoutEventSeriesInputSchema) ]),
}).strict();

export const ContactDataCreateManyStudentInputSchema: z.ZodType<Prisma.ContactDataCreateManyStudentInput> = z.object({
  id: z.number().int().optional(),
  type: z.lazy(() => ContactTypeSchema),
  value: z.string()
}).strict();

export const PaymentCreateManyStudentInputSchema: z.ZodType<Prisma.PaymentCreateManyStudentInput> = z.object({
  id: z.number().int().optional(),
  price: z.number().int(),
  date: z.coerce.date()
}).strict();

export const EventCreateManyStudentInputSchema: z.ZodType<Prisma.EventCreateManyStudentInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  eventSeriesId: z.number().int().optional().nullable(),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable()
}).strict();

export const ContactDataUpdateWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUpdateWithoutStudentInput> = z.object({
  type: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => EnumContactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactDataUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => EnumContactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactDataUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.ContactDataUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContactTypeSchema),z.lazy(() => EnumContactTypeFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentUpdateWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUpdateWithoutStudentInput> = z.object({
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PaymentUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.PaymentUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUpdateWithoutStudentInputSchema: z.ZodType<Prisma.EventUpdateWithoutStudentInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eventSeries: z.lazy(() => EventSeriesUpdateOneWithoutEventsNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutStudentInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventSeriesId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUncheckedUpdateManyWithoutStudentInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutStudentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  eventSeriesId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventCreateManyEventSeriesInputSchema: z.ZodType<Prisma.EventCreateManyEventSeriesInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  isCanceled: z.boolean().optional(),
  isOverridden: z.boolean().optional(),
  type: z.lazy(() => EventTypeSchema),
  name: z.string(),
  description: z.string().optional().nullable(),
  startHour: z.string().optional().nullable(),
  endHour: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  isPaid: z.boolean().optional().nullable(),
  studentId: z.number().int().optional().nullable()
}).strict();

export const EventUpdateWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUpdateWithoutEventSeriesInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  student: z.lazy(() => StudentUpdateOneWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutEventSeriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EventUncheckedUpdateManyWithoutEventSeriesInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutEventSeriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isCanceled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isOverridden: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => EventTypeSchema),z.lazy(() => EnumEventTypeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endHour: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isPaid: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  studentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const StudentFindFirstArgsSchema: z.ZodType<Prisma.StudentFindFirstArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StudentFindFirstOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentFindManyArgsSchema: z.ZodType<Prisma.StudentFindManyArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StudentAggregateArgsSchema: z.ZodType<Prisma.StudentAggregateArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithRelationInputSchema.array(),StudentOrderByWithRelationInputSchema ]).optional(),
  cursor: StudentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentGroupByArgsSchema: z.ZodType<Prisma.StudentGroupByArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
  orderBy: z.union([ StudentOrderByWithAggregationInputSchema.array(),StudentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentScalarFieldEnumSchema.array(),
  having: StudentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StudentFindUniqueArgsSchema: z.ZodType<Prisma.StudentFindUniqueArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StudentFindUniqueOrThrowArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const ContactDataFindFirstArgsSchema: z.ZodType<Prisma.ContactDataFindFirstArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  where: ContactDataWhereInputSchema.optional(),
  orderBy: z.union([ ContactDataOrderByWithRelationInputSchema.array(),ContactDataOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactDataScalarFieldEnumSchema,ContactDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactDataFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContactDataFindFirstOrThrowArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  where: ContactDataWhereInputSchema.optional(),
  orderBy: z.union([ ContactDataOrderByWithRelationInputSchema.array(),ContactDataOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactDataScalarFieldEnumSchema,ContactDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactDataFindManyArgsSchema: z.ZodType<Prisma.ContactDataFindManyArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  where: ContactDataWhereInputSchema.optional(),
  orderBy: z.union([ ContactDataOrderByWithRelationInputSchema.array(),ContactDataOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactDataScalarFieldEnumSchema,ContactDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ContactDataAggregateArgsSchema: z.ZodType<Prisma.ContactDataAggregateArgs> = z.object({
  where: ContactDataWhereInputSchema.optional(),
  orderBy: z.union([ ContactDataOrderByWithRelationInputSchema.array(),ContactDataOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ContactDataGroupByArgsSchema: z.ZodType<Prisma.ContactDataGroupByArgs> = z.object({
  where: ContactDataWhereInputSchema.optional(),
  orderBy: z.union([ ContactDataOrderByWithAggregationInputSchema.array(),ContactDataOrderByWithAggregationInputSchema ]).optional(),
  by: ContactDataScalarFieldEnumSchema.array(),
  having: ContactDataScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ContactDataFindUniqueArgsSchema: z.ZodType<Prisma.ContactDataFindUniqueArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  where: ContactDataWhereUniqueInputSchema,
}).strict() ;

export const ContactDataFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContactDataFindUniqueOrThrowArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  where: ContactDataWhereUniqueInputSchema,
}).strict() ;

export const PaymentFindFirstArgsSchema: z.ZodType<Prisma.PaymentFindFirstArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentScalarFieldEnumSchema,PaymentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PaymentFindFirstOrThrowArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentScalarFieldEnumSchema,PaymentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentFindManyArgsSchema: z.ZodType<Prisma.PaymentFindManyArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PaymentScalarFieldEnumSchema,PaymentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PaymentAggregateArgsSchema: z.ZodType<Prisma.PaymentAggregateArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithRelationInputSchema.array(),PaymentOrderByWithRelationInputSchema ]).optional(),
  cursor: PaymentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PaymentGroupByArgsSchema: z.ZodType<Prisma.PaymentGroupByArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
  orderBy: z.union([ PaymentOrderByWithAggregationInputSchema.array(),PaymentOrderByWithAggregationInputSchema ]).optional(),
  by: PaymentScalarFieldEnumSchema.array(),
  having: PaymentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PaymentFindUniqueArgsSchema: z.ZodType<Prisma.PaymentFindUniqueArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const PaymentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PaymentFindUniqueOrThrowArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventSeriesFindFirstArgsSchema: z.ZodType<Prisma.EventSeriesFindFirstArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  where: EventSeriesWhereInputSchema.optional(),
  orderBy: z.union([ EventSeriesOrderByWithRelationInputSchema.array(),EventSeriesOrderByWithRelationInputSchema ]).optional(),
  cursor: EventSeriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventSeriesScalarFieldEnumSchema,EventSeriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventSeriesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventSeriesFindFirstOrThrowArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  where: EventSeriesWhereInputSchema.optional(),
  orderBy: z.union([ EventSeriesOrderByWithRelationInputSchema.array(),EventSeriesOrderByWithRelationInputSchema ]).optional(),
  cursor: EventSeriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventSeriesScalarFieldEnumSchema,EventSeriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventSeriesFindManyArgsSchema: z.ZodType<Prisma.EventSeriesFindManyArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  where: EventSeriesWhereInputSchema.optional(),
  orderBy: z.union([ EventSeriesOrderByWithRelationInputSchema.array(),EventSeriesOrderByWithRelationInputSchema ]).optional(),
  cursor: EventSeriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventSeriesScalarFieldEnumSchema,EventSeriesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventSeriesAggregateArgsSchema: z.ZodType<Prisma.EventSeriesAggregateArgs> = z.object({
  where: EventSeriesWhereInputSchema.optional(),
  orderBy: z.union([ EventSeriesOrderByWithRelationInputSchema.array(),EventSeriesOrderByWithRelationInputSchema ]).optional(),
  cursor: EventSeriesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventSeriesGroupByArgsSchema: z.ZodType<Prisma.EventSeriesGroupByArgs> = z.object({
  where: EventSeriesWhereInputSchema.optional(),
  orderBy: z.union([ EventSeriesOrderByWithAggregationInputSchema.array(),EventSeriesOrderByWithAggregationInputSchema ]).optional(),
  by: EventSeriesScalarFieldEnumSchema.array(),
  having: EventSeriesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventSeriesFindUniqueArgsSchema: z.ZodType<Prisma.EventSeriesFindUniqueArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  where: EventSeriesWhereUniqueInputSchema,
}).strict() ;

export const EventSeriesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventSeriesFindUniqueOrThrowArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  where: EventSeriesWhereUniqueInputSchema,
}).strict() ;

export const StudentCreateArgsSchema: z.ZodType<Prisma.StudentCreateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
}).strict() ;

export const StudentUpsertArgsSchema: z.ZodType<Prisma.StudentUpsertArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
  create: z.union([ StudentCreateInputSchema,StudentUncheckedCreateInputSchema ]),
  update: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
}).strict() ;

export const StudentCreateManyArgsSchema: z.ZodType<Prisma.StudentCreateManyArgs> = z.object({
  data: z.union([ StudentCreateManyInputSchema,StudentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StudentDeleteArgsSchema: z.ZodType<Prisma.StudentDeleteArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateArgsSchema: z.ZodType<Prisma.StudentUpdateArgs> = z.object({
  select: StudentSelectSchema.optional(),
  include: StudentIncludeSchema.optional(),
  data: z.union([ StudentUpdateInputSchema,StudentUncheckedUpdateInputSchema ]),
  where: StudentWhereUniqueInputSchema,
}).strict() ;

export const StudentUpdateManyArgsSchema: z.ZodType<Prisma.StudentUpdateManyArgs> = z.object({
  data: z.union([ StudentUpdateManyMutationInputSchema,StudentUncheckedUpdateManyInputSchema ]),
  where: StudentWhereInputSchema.optional(),
}).strict() ;

export const StudentDeleteManyArgsSchema: z.ZodType<Prisma.StudentDeleteManyArgs> = z.object({
  where: StudentWhereInputSchema.optional(),
}).strict() ;

export const ContactDataCreateArgsSchema: z.ZodType<Prisma.ContactDataCreateArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  data: z.union([ ContactDataCreateInputSchema,ContactDataUncheckedCreateInputSchema ]),
}).strict() ;

export const ContactDataUpsertArgsSchema: z.ZodType<Prisma.ContactDataUpsertArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  where: ContactDataWhereUniqueInputSchema,
  create: z.union([ ContactDataCreateInputSchema,ContactDataUncheckedCreateInputSchema ]),
  update: z.union([ ContactDataUpdateInputSchema,ContactDataUncheckedUpdateInputSchema ]),
}).strict() ;

export const ContactDataCreateManyArgsSchema: z.ZodType<Prisma.ContactDataCreateManyArgs> = z.object({
  data: z.union([ ContactDataCreateManyInputSchema,ContactDataCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ContactDataDeleteArgsSchema: z.ZodType<Prisma.ContactDataDeleteArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  where: ContactDataWhereUniqueInputSchema,
}).strict() ;

export const ContactDataUpdateArgsSchema: z.ZodType<Prisma.ContactDataUpdateArgs> = z.object({
  select: ContactDataSelectSchema.optional(),
  include: ContactDataIncludeSchema.optional(),
  data: z.union([ ContactDataUpdateInputSchema,ContactDataUncheckedUpdateInputSchema ]),
  where: ContactDataWhereUniqueInputSchema,
}).strict() ;

export const ContactDataUpdateManyArgsSchema: z.ZodType<Prisma.ContactDataUpdateManyArgs> = z.object({
  data: z.union([ ContactDataUpdateManyMutationInputSchema,ContactDataUncheckedUpdateManyInputSchema ]),
  where: ContactDataWhereInputSchema.optional(),
}).strict() ;

export const ContactDataDeleteManyArgsSchema: z.ZodType<Prisma.ContactDataDeleteManyArgs> = z.object({
  where: ContactDataWhereInputSchema.optional(),
}).strict() ;

export const PaymentCreateArgsSchema: z.ZodType<Prisma.PaymentCreateArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  data: z.union([ PaymentCreateInputSchema,PaymentUncheckedCreateInputSchema ]),
}).strict() ;

export const PaymentUpsertArgsSchema: z.ZodType<Prisma.PaymentUpsertArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
  create: z.union([ PaymentCreateInputSchema,PaymentUncheckedCreateInputSchema ]),
  update: z.union([ PaymentUpdateInputSchema,PaymentUncheckedUpdateInputSchema ]),
}).strict() ;

export const PaymentCreateManyArgsSchema: z.ZodType<Prisma.PaymentCreateManyArgs> = z.object({
  data: z.union([ PaymentCreateManyInputSchema,PaymentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PaymentDeleteArgsSchema: z.ZodType<Prisma.PaymentDeleteArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const PaymentUpdateArgsSchema: z.ZodType<Prisma.PaymentUpdateArgs> = z.object({
  select: PaymentSelectSchema.optional(),
  include: PaymentIncludeSchema.optional(),
  data: z.union([ PaymentUpdateInputSchema,PaymentUncheckedUpdateInputSchema ]),
  where: PaymentWhereUniqueInputSchema,
}).strict() ;

export const PaymentUpdateManyArgsSchema: z.ZodType<Prisma.PaymentUpdateManyArgs> = z.object({
  data: z.union([ PaymentUpdateManyMutationInputSchema,PaymentUncheckedUpdateManyInputSchema ]),
  where: PaymentWhereInputSchema.optional(),
}).strict() ;

export const PaymentDeleteManyArgsSchema: z.ZodType<Prisma.PaymentDeleteManyArgs> = z.object({
  where: PaymentWhereInputSchema.optional(),
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict() ;

export const EventSeriesCreateArgsSchema: z.ZodType<Prisma.EventSeriesCreateArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  data: z.union([ EventSeriesCreateInputSchema,EventSeriesUncheckedCreateInputSchema ]),
}).strict() ;

export const EventSeriesUpsertArgsSchema: z.ZodType<Prisma.EventSeriesUpsertArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  where: EventSeriesWhereUniqueInputSchema,
  create: z.union([ EventSeriesCreateInputSchema,EventSeriesUncheckedCreateInputSchema ]),
  update: z.union([ EventSeriesUpdateInputSchema,EventSeriesUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventSeriesCreateManyArgsSchema: z.ZodType<Prisma.EventSeriesCreateManyArgs> = z.object({
  data: z.union([ EventSeriesCreateManyInputSchema,EventSeriesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventSeriesDeleteArgsSchema: z.ZodType<Prisma.EventSeriesDeleteArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  where: EventSeriesWhereUniqueInputSchema,
}).strict() ;

export const EventSeriesUpdateArgsSchema: z.ZodType<Prisma.EventSeriesUpdateArgs> = z.object({
  select: EventSeriesSelectSchema.optional(),
  include: EventSeriesIncludeSchema.optional(),
  data: z.union([ EventSeriesUpdateInputSchema,EventSeriesUncheckedUpdateInputSchema ]),
  where: EventSeriesWhereUniqueInputSchema,
}).strict() ;

export const EventSeriesUpdateManyArgsSchema: z.ZodType<Prisma.EventSeriesUpdateManyArgs> = z.object({
  data: z.union([ EventSeriesUpdateManyMutationInputSchema,EventSeriesUncheckedUpdateManyInputSchema ]),
  where: EventSeriesWhereInputSchema.optional(),
}).strict() ;

export const EventSeriesDeleteManyArgsSchema: z.ZodType<Prisma.EventSeriesDeleteManyArgs> = z.object({
  where: EventSeriesWhereInputSchema.optional(),
}).strict() ;