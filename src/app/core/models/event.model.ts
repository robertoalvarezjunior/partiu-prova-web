import { CategoryModel } from './category.model';

export interface EventModel {
  id: string;
  title: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
  local: string;
  policy: string | null;
  coupons: string | null;
  created_by_id: string;
  created_at: Date | null;
  modificated_at: Date | null;
  category: CategoryModel;
}

export interface EventCardModel {
  id: string;
  title: string;
  starts_at: Date;
  local: string;
  category: CategoryModel;
}
