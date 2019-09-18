# isolate-block-loader
支持chameleon框架代码级多态处理，多平台代码隔离

# 使用方法

官方不支持的条件下，可以在chameleon.config.js添加如下代码进行配置：
```
cml.utils.plugin('webpackConfig', function({ type, media, webpackConfig }, cb) {
  let moduleRules = webpackConfig.module.rules;
  // console.log(']]]]]]]]]]]]]]]]]', moduleRules[0]);
  for (let i = 0; moduleRules && i < moduleRules.length; i++) {
    if (moduleRules[i].test && typeof moduleRules[i].test == 'object' && moduleRules[i].test.test('test.cml') 
        && moduleRules[i].use && moduleRules[i].use.length > 0) {
      moduleRules[i].use.push({
        loader: 'isolate-block-loader',
        options: {
          cmlType: type,
          media,
        }
      });
    }
  }
  // console.log('=========== after config ==========', JSON.stringify(webpackConfig, null, 2));
  // cb函数用于设置修改后的配置
  cb({
    type,
    media,
    webpackConfig
  });
});
```
