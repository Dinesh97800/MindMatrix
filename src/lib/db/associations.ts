import type { DbModels } from "./models/index";

export function setupAssociations(models: DbModels) {
  const {
    AdminUser,
    PageCategory,
    Page,
    PageSection,
    PageSEO,
    Media,
    BlogCategory,
    Blog,
    SiteSetting,
  } = models;

  PageCategory.hasMany(PageCategory, {
    as: "children",
    foreignKey: "parentId",
  });
  PageCategory.belongsTo(PageCategory, {
    as: "parent",
    foreignKey: "parentId",
  });
  PageCategory.hasMany(Page, { foreignKey: "categoryId", as: "pages" });
  Page.belongsTo(PageCategory, { foreignKey: "categoryId", as: "category" });

  Page.hasMany(PageSection, { foreignKey: "pageId", as: "sections" });
  PageSection.belongsTo(Page, { foreignKey: "pageId", as: "page" });

  Page.hasOne(PageSEO, { foreignKey: "pageId", as: "seo" });
  PageSEO.belongsTo(Page, { foreignKey: "pageId", as: "page" });
  PageSEO.belongsTo(Media, { foreignKey: "ogImageId", as: "ogImage" });

  Page.belongsTo(AdminUser, { foreignKey: "createdBy", as: "creator" });
  Page.belongsTo(AdminUser, { foreignKey: "updatedBy", as: "updater" });

  Media.belongsTo(AdminUser, { foreignKey: "uploadedBy", as: "uploader" });

  BlogCategory.hasMany(Blog, { foreignKey: "categoryId", as: "posts" });
  Blog.belongsTo(BlogCategory, { foreignKey: "categoryId", as: "category" });
  Blog.belongsTo(AdminUser, { foreignKey: "authorId", as: "author" });
  Blog.belongsTo(Media, {
    foreignKey: "featuredMediaId",
    as: "featuredMedia",
  });
  Blog.belongsTo(Media, { foreignKey: "ogImageId", as: "ogImage" });

  SiteSetting.belongsTo(AdminUser, {
    foreignKey: "updatedBy",
    as: "updater",
  });
}
