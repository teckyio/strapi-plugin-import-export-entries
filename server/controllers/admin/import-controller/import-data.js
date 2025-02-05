'use strict';

const { getService } = require('../../../utils');

const importData = async (ctx) => {
  if (!hasPermissions(ctx)) {
    return ctx.forbidden();
  }

  const { user } = ctx.state;
  const { slug, data: dataRaw, format, idField } = ctx.request.body;

  const res = await getService('import').importData(dataRaw, {
    slug,
    format,
    user,
    idField,
  });

  ctx.body = {
    failures: res.failures,
  };
};

const hasPermissions = (ctx) => {
  let { slug } = ctx.request.body;
  const { userAbility } = ctx.state;

  const permissionChecker = strapi.plugin('content-manager').service('permission-checker').create({ userAbility, model: slug });

  return permissionChecker.can.create() && permissionChecker.can.update();
};

module.exports = ({ strapi }) => importData;
