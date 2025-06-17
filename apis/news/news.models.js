import mongoose from "mongoose";
import slugify from "slugify";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Pre-save hook to generate a unique slug
newsSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Ensure slug is unique
  while (await mongoose.models.News.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  this.slug = uniqueSlug;
  next();
});

const newsCollection = mongoose.model("News", newsSchema);

export default newsCollection;
