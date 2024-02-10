interface FileInfo {
  bucketName?: string;
  contentType?: string;
  fullPath?: string;
  name?: string;
  publicUrl?: string;
  size?: number;
  uid?: string | number;
}

export interface Influencer {
  _id: string;
  name: string;
  socialMediaHandles: string[];
  followers: number;
  engagementRate: number;
  category: string;
  contactInformation: string;
  notes?: string;
  profileImageUrl?: FileInfo;
  archived: boolean;
}
