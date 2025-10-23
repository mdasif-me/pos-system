# POS System - Desktop Point of Sale Application

A modern, full-featured Point of Sale (POS) desktop application built with React, TypeScript, Electron, and Tailwind CSS.

## 🚀 Features

### Core POS Functionality
- **Product Management**: Add, edit, delete products with categories
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout Process**: Multiple payment methods (Cash, Card, Digital Wallet)
- **Inventory Tracking**: Real-time stock management and low-stock alerts
- **Transaction Processing**: Complete sales with tax calculations

### Modern UI/UX
- **Responsive Design**: Optimized for desktop use with touch-friendly interface
- **Dark/Light Theme**: Modern sidebar navigation
- **Real-time Updates**: Live inventory and cart updates
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Toast Notifications**: Success/error notifications for all actions

### Business Features
- **Reports & Analytics**: Sales tracking and performance metrics
- **Category Management**: Organize products by custom categories
- **User Management**: Admin and cashier roles
- **Settings Configuration**: Store details, tax rates, and preferences

### Technical Features
- **TypeScript**: Full type safety and better developer experience
- **State Management**: Zustand for efficient state handling
- **Persistent Storage**: Local data persistence with Zustand persist
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Production Ready**: Optimized builds for distribution

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Desktop**: Electron
- **State Management**: Zustand
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Testing**: Jest, React Testing Library
- **Build Tools**: React Scripts, Electron Builder

## 📋 Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm
- Git

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pos-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm start
   # or
   npm start
   ```

4. **Start Electron in development**
   ```bash
   # In a new terminal
   pnpm run electron-dev
   # or
   npm run electron-dev
   ```

### Development Scripts

- `pnpm start` - Start React development server
- `pnpm run build` - Build React app for production
- `pnpm test` - Run test suite
- `pnpm run electron` - Start Electron with built React app
- `pnpm run electron-dev` - Start Electron in development mode

## 📦 Building for Production

### Quick Build (Current Platform)
```bash
pnpm run build-electron
```

### Cross-Platform Builds

**Windows:**
```bash
pnpm run build-win
```

**macOS:**
```bash
pnpm run build-mac
```

**Linux:**
```bash
pnpm run build-linux
```

**All Platforms:**
```bash
pnpm run build-all
```

### Using Build Scripts

**Linux/macOS:**
```bash
chmod +x build-production.sh
./build-production.sh
```

**Windows:**
```batch
build-production.bat
```

## 🏗️ Project Structure

```
pos-system/
├── public/
│   ├── electron.js          # Main Electron process
│   ├── preload.js           # Preload script for security
│   └── assets/              # Icons and static assets
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   └── layout/          # Layout components
│   ├── pages/               # Main application pages
│   ├── stores/              # Zustand store definitions
│   ├── types/               # TypeScript type definitions
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── tests/               # Test files
├── build-production.sh      # Linux/macOS build script
├── build-production.bat     # Windows build script
└── dist/                    # Built applications
```

## 🧪 Testing

Run the test suite:
```bash
pnpm test
# or
npm test
```

Run tests in watch mode:
```bash
pnpm test -- --watch
```

## 🔧 Configuration

### Store Settings
- Store name and details
- Tax rates and currency
- User roles and permissions

### Product Categories
- Custom category creation
- Color-coded organization
- Easy category management

### Electron Configuration
The app is configured with modern security practices:
- Context isolation enabled
- Node integration disabled
- Secure preload scripts
- CSP headers for web security

## 📱 Usage

### Initial Setup
1. Launch the application
2. Configure store settings in the Settings page
3. Add product categories
4. Add your first products in Inventory

### Daily Operations
1. **POS Page**: Main sales interface
   - Browse products by category
   - Add items to cart
   - Process payments
   - Complete transactions

2. **Inventory Page**: Manage your products
   - Add new products
   - Update stock levels
   - Edit product details
   - Monitor low stock alerts

3. **Reports Page**: View business metrics
   - Daily sales totals
   - Top-selling products
   - Transaction history

4. **Settings Page**: Configure the system
   - Store information
   - User management
   - Category management
   - Notification preferences

## 🔒 Security Features

- **Secure Electron Configuration**: Modern security practices
- **Context Isolation**: Renderer process isolation
- **Input Validation**: Form validation and sanitization
- **Error Boundaries**: Graceful error handling
- **Type Safety**: Full TypeScript implementation

## 🚀 Deployment

### Desktop Distribution

1. **Build the application**
   ```bash
   pnpm run build-all
   ```

2. **Find built applications in `/dist` folder**
   - `pos-system-1.0.0.exe` (Windows)
   - `pos-system-1.0.0.dmg` (macOS)
   - `pos-system-1.0.0.AppImage` (Linux)

3. **Distribute to users**
   - Share installation files
   - Include any necessary documentation
   - Consider code signing for Windows/macOS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Test files currently show TypeScript errors (tests run correctly)
- Some Electron dependencies may show security warnings (false positives)

## 🔮 Future Enhancements

- [ ] Receipt printing functionality
- [ ] Barcode scanner integration
- [ ] Customer management system
- [ ] Advanced reporting and analytics
- [ ] Cloud synchronization
- [ ] Multi-store support
- [ ] Advanced user permissions
- [ ] Backup and restore features

## 💡 Tips for Developers

### Development Best Practices
- Always use TypeScript for type safety
- Follow the existing folder structure
- Add tests for new components
- Use the established error handling patterns
- Follow the component architecture

### State Management
- Use Zustand store for global state
- Keep local state minimal
- Use proper error handling in async actions

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design principles
- Test on different screen sizes

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check existing documentation
- Review the codebase for examples

---

**Built with ❤️ using React, TypeScript, and Electron**

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Development

1. Install dependencies:
```bash
npm install# pos-system
