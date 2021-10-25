export interface TranslateResponse {
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
