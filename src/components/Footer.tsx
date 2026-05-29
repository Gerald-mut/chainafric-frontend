
import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { useTranslation } from "@/utils/i18n";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-afri-dark border-t border-muted">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold gradient-text">ChainAfric</h2>
            </div>
            <p className="text-muted-foreground max-w-md">
              {t('footerDesc')}
            </p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-4">
              {t('explore')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-white">
                  {t('blockchainData')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-white">
                  {t('dashboard')}
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-white">
                  {t('api')}
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-4">
              {t('about')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-white">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-white">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-white">
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-muted">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ChainAfric. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
