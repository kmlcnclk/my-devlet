import mongoose from 'mongoose';
import { IAssetBackground } from '@/types/AssetBackground';

export interface AssetBackgroundDocument
  extends mongoose.Document,
    IAssetBackground {
  createdAt: Date;
  updatedAt: Date;
}

const assetBackgroundSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assetInfos: [
      {
        name: { type: String },
        typeOfAsset: { type: String },
        description: { type: String },
        location: {
          type: String,
        },
        purchaseDate: {
          type: Date,
        },
        purchasePrice: {
          type: Number,
        },
        previousOwner: {
          type: String,
        },
      },
    ],
    ipfsHash: { type: String },
  },
  {
    timestamps: true,
  }
);

const assetBackgroundModel =
  mongoose.models.AssetBackground ||
  mongoose.model<AssetBackgroundDocument>(
    'AssetBackground',
    assetBackgroundSchema
  );

export default assetBackgroundModel;
