import { useState, useEffect } from 'react';
import type { JeevifyIdentity, ViewMode, MatrimonyMatch } from './types';
import { generateIdentityFromRules, ensureCompleteIdentity } from './services/aiGenerator';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingHero } from './components/LandingHero';
import { ObjectUploadModal } from './components/ObjectUploadModal';
import { IdentityCardModal } from './components/IdentityCardModal';
import { MyWorldView } from './components/MyWorldView';
import { MatrimonyView } from './components/MatrimonyView';
import { LinkedInView } from './components/LinkedInView';
import { AstroView } from './components/AstroView';
import { ThingCourtView } from './components/ThingCourtView';
import { ThingNewsView } from './components/ThingNewsView';
import { FamilyView } from './components/FamilyView';
import { DebugPanel } from './components/DebugPanel';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [activeIdentity, setActiveIdentity] = useState<JeevifyIdentity>(() => {
    const saved = localStorage.getItem('jeevify_active_identity');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.objectType) {
          return ensureCompleteIdentity(parsed);
        }
      } catch (e) {
        console.warn('Failed to load active identity from storage:', e);
      }
    }
    return generateIdentityFromRules('Ballpoint Pen');
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);
  const [initialUploadObjectType, setInitialUploadObjectType] = useState('');
  const [selectedPartnerForPorutham, setSelectedPartnerForPorutham] = useState<MatrimonyMatch | null>(null);

  // Save active identity in localStorage for consistency across pages
  useEffect(() => {
    localStorage.setItem('jeevify_active_identity', JSON.stringify(activeIdentity));
  }, [activeIdentity]);

  const handleOpenUpload = (presetType = '') => {
    setInitialUploadObjectType(presetType);
    setIsUploadModalOpen(true);
  };

  const handleIdentityCreated = (newIdentity: JeevifyIdentity) => {
    setActiveIdentity(newIdentity);
    setIsUploadModalOpen(false);
    setIsIdentityModalOpen(true);
  };

  const handleQuickObjectSelect = (objectType: string) => {
    const identity = generateIdentityFromRules(objectType);
    setActiveIdentity(identity);
    setIsIdentityModalOpen(true);
  };

  const handleSelectPartnerForPorutham = (match: MatrimonyMatch) => {
    setSelectedPartnerForPorutham(match);
    setCurrentView('astro');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#1a1a1a] flex flex-col font-sans-body selection:bg-[#d4af37] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        activeIdentity={activeIdentity}
        onOpenUpload={() => handleOpenUpload('')}
      />

      {/* Main Body Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Left Sidebar (visible in app views) */}
        {currentView !== 'landing' && (
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            onOpenUpload={() => handleOpenUpload('')}
          />
        )}

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 min-w-0 overflow-y-auto">
          {currentView === 'landing' && (
            <LandingHero
              onStart={() => handleOpenUpload('')}
              onSelectQuickObject={handleQuickObjectSelect}
            />
          )}

          {currentView === 'my-world' && (
            <MyWorldView
              identity={activeIdentity}
              onNavigate={setCurrentView}
              onOpenUpload={() => handleOpenUpload('')}
            />
          )}

          {currentView === 'my-identity' && (
            <div className="max-w-xl mx-auto py-8">
              <IdentityCardModal
                identity={activeIdentity}
                isOpen={true}
                onClose={() => setCurrentView('my-world')}
                onNavigateWorld={setCurrentView}
              />
            </div>
          )}

          {currentView === 'matrimony' && (
            <MatrimonyView
              activeIdentity={activeIdentity}
              onSelectPartnerForPorutham={handleSelectPartnerForPorutham}
            />
          )}

          {currentView === 'linkedin' && (
            <LinkedInView identity={activeIdentity} />
          )}

          {(currentView === 'astro' || currentView === 'porutham') && (
            <AstroView
              activeIdentity={activeIdentity}
              preselectedMatchForPorutham={selectedPartnerForPorutham}
            />
          )}

          {currentView === 'thing-court' && (
            <ThingCourtView
              activeIdentity={activeIdentity}
              onBack={() => setCurrentView('my-world')}
            />
          )}

          {currentView === 'thing-news' && (
            <ThingNewsView
              activeIdentity={activeIdentity}
              onBack={() => setCurrentView('my-world')}
            />
          )}

          {currentView === 'family' && (
            <FamilyView
              activeIdentity={activeIdentity}
              onNavigate={setCurrentView}
            />
          )}
        </main>
      </div>

      {/* Object Creation / Upload Modal */}
      <ObjectUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleIdentityCreated}
        initialObjectType={initialUploadObjectType}
      />

      {/* Collectible Identity Reveal Modal */}
      <IdentityCardModal
        identity={activeIdentity}
        isOpen={isIdentityModalOpen}
        onClose={() => {
          setIsIdentityModalOpen(false);
          setCurrentView('my-world');
        }}
        onNavigateWorld={(view) => {
          setIsIdentityModalOpen(false);
          setCurrentView(view);
        }}
      />

      {/* Developer AI Debug Overlay */}
      <DebugPanel
        activeIdentity={activeIdentity}
        onSwitchIdentity={(newId) => setActiveIdentity(newId)}
      />

    </div>
  );
}

export default App;
