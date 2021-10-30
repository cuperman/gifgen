export interface Random {
  data: Data;
  meta: Meta;
}

export interface Data {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
  image_original_url: string;
  image_url: string;
  image_mp4_url: string;
  image_frames: string;
  image_width: string;
  image_height: string;
  fixed_height_downsampled_url: string;
  fixed_height_downsampled_width: string;
  fixed_height_downsampled_height: string;
  fixed_width_downsampled_url: string;
  fixed_width_downsampled_width: string;
  fixed_width_downsampled_height: string;
  fixed_height_small_url: string;
  fixed_height_small_still_url: string;
  fixed_height_small_width: string;
  fixed_height_small_height: string;
  fixed_width_small_url: string;
  fixed_width_small_still_url: string;
  fixed_width_small_width: string;
  fixed_width_small_height: string;
  caption: string;
}

export interface Images {
  hd: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  downsized_large: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_height_small_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  original: Original;
  fixed_height_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  downsized_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_height_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  downsized_medium: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  downsized: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  preview_webp: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  original_mp4: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  fixed_height_small: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  fixed_height: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  downsized_small: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  preview: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  fixed_width_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_width_small_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_width_small: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  original_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_width_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  looping: Looping;
  fixed_width: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  preview_gif: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
}

export interface HdOrOriginalMp4OrDownsizedSmallOrPreview {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

export interface DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface Original {
  frames: string;
  hash: string;
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface FixedHeightDownsampledOrFixedWidthDownsampled {
  height: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface Looping {
  mp4: string;
  mp4_size: string;
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  is_verified: boolean;
  website_url: string;
  instagram_url: string;
}

export interface Meta {
  msg: string;
  status: number;
  response_id: string;
}

export interface Search {
  data: DataEntity[];
  pagination: Pagination;
  meta: Meta;
}

export interface DataEntity {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  analytics_response_payload: string;
  analytics: Analytics;
}

export interface Images {
  original: Original;
  downsized: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  downsized_large: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  downsized_medium: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  downsized_small: DownsizedSmallOrOriginalMp4OrPreview;
  downsized_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_height: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_height_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_height_small: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_height_small_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_height_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_width: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_width_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_width_small: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_width_small_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_width_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  looping: Looping;
  original_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  original_mp4: DownsizedSmallOrOriginalMp4OrPreview;
  preview: DownsizedSmallOrOriginalMp4OrPreview;
  preview_gif: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  preview_webp: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
}

export interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}

export interface DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface DownsizedSmallOrOriginalMp4OrPreview {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
}

export interface FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

export interface FixedHeightDownsampledOrFixedWidthDownsampled {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
}

export interface Looping {
  mp4_size: string;
  mp4: string;
}

export interface Analytics {
  onload: OnloadOrOnclickOrOnsent;
  onclick: OnloadOrOnclickOrOnsent;
  onsent: OnloadOrOnclickOrOnsent;
}

export interface OnloadOrOnclickOrOnsent {
  url: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface Translate {
  data: Data;
  meta: Meta;
}

export interface Data {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
}

export interface Images {
  hd: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  downsized_large: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_height_small_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  original: Original;
  fixed_height_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  downsized_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_height_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  downsized_medium: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  downsized: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  preview_webp: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  original_mp4: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  fixed_height_small: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  fixed_height: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  downsized_small: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  preview: HdOrOriginalMp4OrDownsizedSmallOrPreview;
  fixed_width_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_width_small_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_width_small: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  original_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  fixed_width_still: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
  looping: Looping;
  fixed_width: FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth;
  preview_gif: DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif;
}

export interface HdOrOriginalMp4OrDownsizedSmallOrPreview {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

export interface DownsizedLargeOrFixedHeightSmallStillOrDownsizedStillOrFixedHeightStillOrDownsizedMediumOrDownsizedOrPreviewWebpOrFixedWidthSmallStillOrOriginalStillOrFixedWidthStillOrPreviewGif {
  height: string;
  size: string;
  url: string;
  width: string;
}

export interface Original {
  frames: string;
  hash: string;
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface FixedHeightDownsampledOrFixedWidthDownsampled {
  height: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface FixedHeightSmallOrFixedHeightOrFixedWidthSmallOrFixedWidth {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

export interface Looping {
  mp4: string;
  mp4_size: string;
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  is_verified: boolean;
  website_url: string;
  instagram_url: string;
}

export interface Meta {
  msg: string;
  status: number;
  response_id: string;
}

export interface Trending {
  data: DataEntity[];
  pagination: Pagination;
  meta: Meta;
}

export interface DataEntity {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user: User;
  analytics_response_payload: string;
  analytics: Analytics;
}

export interface Images {
  original: Original;
  downsized: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  downsized_large: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  downsized_medium: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  downsized_small: DownsizedSmallOrOriginalMp4OrPreview;
  downsized_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_height: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_height_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_height_small: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_height_small_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_height_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_width: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_width_downsampled: FixedHeightDownsampledOrFixedWidthDownsampled;
  fixed_width_small: FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall;
  fixed_width_small_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  fixed_width_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  looping: Looping;
  original_still: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  original_mp4: DownsizedSmallOrOriginalMp4OrPreview;
  preview: DownsizedSmallOrOriginalMp4OrPreview;
  preview_gif: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  preview_webp: DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
  '480w_still': DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill;
}

export interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}

export interface DownsizedOrDownsizedLargeOrDownsizedMediumOrDownsizedStillOrFixedHeightSmallStillOrFixedHeightStillOrFixedWidthSmallStillOrFixedWidthStillOrOriginalStillOrPreviewGifOrPreviewWebpOr480wStill {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface DownsizedSmallOrOriginalMp4OrPreview {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
}

export interface FixedHeightOrFixedHeightSmallOrFixedWidthOrFixedWidthSmall {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

export interface FixedHeightDownsampledOrFixedWidthDownsampled {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
}

export interface Looping {
  mp4_size: string;
  mp4: string;
}

export interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface Analytics {
  onload: OnloadOrOnclickOrOnsent;
  onclick: OnloadOrOnclickOrOnsent;
  onsent: OnloadOrOnclickOrOnsent;
}

export interface OnloadOrOnclickOrOnsent {
  url: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}
