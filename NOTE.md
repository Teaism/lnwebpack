# webpack learn note


#### 加载css
```
    //loader
        npm install --save-dev style-loader css-loader
    
    //config
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
   
    //js
        import './fileName.css';

```
#### 加载图片
    //loader
        npm install --save-dev file-loader

    //config
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }

    //js
        ```javascript
        import Icon from './icon.png';
        ```
#### 加载字体
```
    //loader
        npm install --save-dev file-loader url-loader 

    //project
        src/fileName.woff
        src/fileName.woff2
        ...eot|ttf|otf

    //config
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-loader']
        }

    //css
        @font-face {
          font-family: 'myfont';
          font-style: normal;
          font-weight: 400;
          src: url('./aguafina-script-v6-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
               url('./aguafina-script-v6-latin-regular.woff') format('woff'); /* Modern Browsers */
        }
        .demo {
          font-family: 'myfont';
        }

```
