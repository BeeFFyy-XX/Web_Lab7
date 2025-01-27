const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Отримуємо всі HTML-файли з src/pages
const htmlFiles = fs.readdirSync(path.resolve(__dirname, 'src/pages')).filter(file => file.endsWith('.html'));

module.exports = {
    entry: './src/index.js', // Точка входу в проект
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'], // Для обробки LESS
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'], // Для обробки SCSS
            },
            {
                test: /\.styl$/,
                use: ['style-loader', 'css-loader', 'stylus-loader'], // Для обробки Stylus
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets/images', to: 'assets/images' },
            ],
        }),
        new CleanWebpackPlugin(),
        // Генеруємо HtmlWebpackPlugin для кожного HTML-файлу
        ...htmlFiles.map(file => new HtmlWebpackPlugin({
            template: `./src/pages/${file}`,
            filename: file,
        })),
        new MiniCssExtractPlugin({
            filename: '[name].css',  // Ім'я файлу CSS, яке буде створено
        }),
    ],
    devServer: {
        static: './dist',
        open: true, // Автоматично відкривати у браузері
        port: 8080,
        hot: true,
    },
    mode: 'development',  // Для розробки
};
