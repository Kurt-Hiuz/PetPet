# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
petpet
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ project-structure.txt
├─ project-structure2.txt
├─ public
│  ├─ images
│  │  ├─ no-img.png
│  │  ├─ posts_test
│  │  │  ├─ cat.jpg
│  │  │  └─ dog.jpg
│  │  ├─ store_test
│  │  │  ├─ aquarium.png
│  │  │  ├─ bird_food.png
│  │  │  ├─ dog_food.png
│  │  │  ├─ drinking_bowl.png
│  │  │  └─ sweater.png
│  │  └─ user_profile_test
│  │     ├─ pet1.png
│  │     ├─ pet2.png
│  │     ├─ pet3.png
│  │     ├─ pet4.png
│  │     └─ user-avatar.jpg
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ Unbounded
│  │  │     └─ Unbounded-VariableFont_wght.ttf
│  │  ├─ images
│  │  │  ├─ component_imgs
│  │  │  │  └─ logo
│  │  │  │     ├─ FunnyFace.jsx
│  │  │  │     └─ LogoQuokka.jsx
│  │  │  ├─ png
│  │  │  │  ├─ funny_face.png
│  │  │  │  └─ logo_quokka.png
│  │  │  └─ svg
│  │  │     ├─ bottom_left_paws.svg
│  │  │     ├─ bottom_right_hearts.svg
│  │  │     ├─ top_left_hearts.svg
│  │  │     └─ top_right_paws.svg
│  │  └─ styles
│  │     ├─ global.css
│  │     └─ variables.css
│  ├─ components
│  │  ├─ pages
│  │  │  ├─ in_process
│  │  │  │  ├─ images
│  │  │  │  │  ├─ bottom_left_paws.svg
│  │  │  │  │  ├─ bottom_right_hearts.svg
│  │  │  │  │  ├─ top_left_hearts.svg
│  │  │  │  │  └─ top_right_paws.svg
│  │  │  │  ├─ InProcess.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ InProcess.module.css
│  │  │  ├─ news
│  │  │  │  ├─ News.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ News.module.css
│  │  │  ├─ not_found
│  │  │  │  ├─ NotFound.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ NotFound.module.css
│  │  │  ├─ profile
│  │  │  │  ├─ Profile.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ Profile.module.css
│  │  │  ├─ store
│  │  │  │  ├─ Store.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ Store.module.css
│  │  │  └─ ymap
│  │  │     ├─ map_components
│  │  │     │  ├─ emergency_btn
│  │  │     │  │  ├─ EmergencyBtn.jsx
│  │  │     │  │  └─ styles
│  │  │     │  │     └─ EmergencyBtn.module.css
│  │  │     │  ├─ map_hot_buttons
│  │  │     │  │  ├─ MapHotButtons.jsx
│  │  │     │  │  └─ styles
│  │  │     │  │     └─ MapHotButtons.module.css
│  │  │     │  ├─ map_search
│  │  │     │  │  ├─ MapSearch.jsx
│  │  │     │  │  └─ styles
│  │  │     │  │     └─ MapSearch.module.css
│  │  │     │  └─ yandex
│  │  │     │     ├─ Map.jsx
│  │  │     │     └─ styles
│  │  │     │        └─ Map.module.css
│  │  │     ├─ styles
│  │  │     │  └─ YMap.module.css
│  │  │     └─ YMap.jsx
│  │  ├─ screens
│  │  │  ├─ error_screen
│  │  │  │  ├─ assets
│  │  │  │  │  └─ paws_svg
│  │  │  │  │     ├─ pig.svg
│  │  │  │  │     ├─ pig_2.svg
│  │  │  │  │     ├─ seagull.svg
│  │  │  │  │     ├─ seagull_2.svg
│  │  │  │  │     ├─ tiger.svg
│  │  │  │  │     ├─ tiger_2.svg
│  │  │  │  │     └─ tiger_3.svg
│  │  │  │  ├─ ErrorScreen.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ ErrorScreen.module.css
│  │  │  ├─ loading_screen
│  │  │  │  ├─ LoadingScreen.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ LoadingScreen.module.css
│  │  │  └─ sing_in
│  │  │     ├─ SingIn.jsx
│  │  │     └─ styles
│  │  │        └─ SingIn.module.css
│  │  ├─ shared
│  │  ├─ template
│  │  │  ├─ Header
│  │  │  │  ├─ Header.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ Header.module.css
│  │  │  ├─ MainContent
│  │  │  │  ├─ MainContent.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ MainContent.module.css
│  │  │  ├─ SideBar
│  │  │  │  ├─ SideBar.jsx
│  │  │  │  └─ styles
│  │  │  │     └─ SideBar.module.css
│  │  │  ├─ styles
│  │  │  │  └─ Template.module.css
│  │  │  └─ Template.jsx
│  │  └─ ui
│  │     ├─ Avatar
│  │     │  ├─ Avatar.jsx
│  │     │  └─ styles
│  │     │     └─ Avatar.module.css
│  │     ├─ Button
│  │     │  ├─ Button.jsx
│  │     │  └─ styles
│  │     │     ├─ Button.module.css
│  │     │     └─ ButtonsVariants.module.css
│  │     ├─ Icon
│  │     │  ├─ Icon.jsx
│  │     │  └─ styles
│  │     │     └─ Icon.module.css
│  │     ├─ IconButton
│  │     │  ├─ IconButton.jsx
│  │     │  └─ styles
│  │     │     └─ IconButton.module.css
│  │     ├─ Input
│  │     │  ├─ Input.jsx
│  │     │  └─ styles
│  │     │     └─ Input.module.css
│  │     ├─ Post
│  │     │  ├─ Post.jsx
│  │     │  ├─ PostActions
│  │     │  │  ├─ PostActions.jsx
│  │     │  │  └─ styles
│  │     │  │     └─ PostActions.module.css
│  │     │  ├─ PostCaption
│  │     │  │  ├─ PostCaption.jsx
│  │     │  │  └─ styles
│  │     │  │     └─ PostCaption.module.css
│  │     │  ├─ PostFooter
│  │     │  │  ├─ PostFooter.jsx
│  │     │  │  └─ styles
│  │     │  │     └─ PostFooter.module.css
│  │     │  ├─ PostHeader
│  │     │  │  ├─ PostHeader.jsx
│  │     │  │  └─ styles
│  │     │  │     └─ PostHeader.module.css
│  │     │  ├─ PostMedia
│  │     │  │  ├─ PostMedia.jsx
│  │     │  │  ├─ renderers
│  │     │  │  │  ├─ index.js
│  │     │  │  │  └─ usingRenderers
│  │     │  │  │     └─ ImageRenderer.jsx
│  │     │  │  └─ styles
│  │     │  │     └─ PostMedia.module.css
│  │     │  └─ styles
│  │     │     └─ Post.module.css
│  │     ├─ PostFeed
│  │     │  ├─ PostFeed.jsx
│  │     │  └─ styles
│  │     │     └─ PostFeed.module.css
│  │     ├─ ProductCard
│  │     │  ├─ ProductCard.jsx
│  │     │  ├─ ProductCardDescription
│  │     │  │  ├─ ProductCardDescription.jsx
│  │     │  │  └─ styles
│  │     │  │     └─ ProductCardDescription.module.css
│  │     │  ├─ ProductCardImage
│  │     │  │  ├─ ProductCardImage.jsx
│  │     │  │  └─ styles
│  │     │  │     └─ ProductCardImage.module.css
│  │     │  └─ styles
│  │     │     └─ ProductCard.module.css
│  │     ├─ ProductCardGrid
│  │     │  ├─ ProductCardGrid.jsx
│  │     │  └─ styles
│  │     │     └─ ProductCardGrid.module.css
│  │     ├─ Reaction
│  │     │  ├─ Reaction.jsx
│  │     │  └─ styles
│  │     │     └─ Reaction.module.css
│  │     ├─ ScrollToTop
│  │     │  ├─ ScrollToTop.jsx
│  │     │  └─ styles
│  │     │     └─ ScrollToTop.module.css
│  │     ├─ ThemeSwitcher
│  │     │  └─ ThemeSwitcher.jsx
│  │     └─ UserHeader
│  │        ├─ styles
│  │        │  └─ UserHeader.module.css
│  │        └─ UserHeader.jsx
│  ├─ config
│  │  ├─ assetsConfig.jsx
│  │  ├─ reactionsConfig.js
│  │  ├─ routesConfig.jsx
│  │  └─ themes.js
│  ├─ data
│  │  ├─ http_codes.json
│  │  ├─ post_test_data.json
│  │  └─ store_test_data.json
│  ├─ features
│  │  ├─ PostFeedContainer
│  │  │  └─ PostFeedContainer.jsx
│  │  └─ StoreSearch
│  │     ├─ StoreSearch.jsx
│  │     └─ styles
│  │        └─ StoreSearch.module.css
│  ├─ hooks
│  │  └─ useFeed.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ routes
│  │  ├─ mainRouter.jsx
│  │  └─ usingRoutes
│  │     ├─ inProcessRoute.jsx
│  │     ├─ newsRoute.jsx
│  │     ├─ profileRoute.jsx
│  │     ├─ storeRoute.jsx
│  │     └─ ymapRoute.jsx
│  ├─ services
│  │  └─ postService.js
│  ├─ shared
│  └─ utils
│     ├─ formatCount.js
│     └─ pluralize.js
└─ vite.config.js

```