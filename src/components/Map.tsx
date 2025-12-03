export default function Map() {
    // Adresse: 20-22 Rue des Boulangers, 68000 Colmar, France
    const address = "20-22 Rue des Boulangers, 68000 Colmar, France";
    const encodedAddress = encodeURIComponent(address);

    // URL simplifiée qui fonctionne sans API key
    const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
      <div className="w-full h-full min-h-[400px] rounded-sm overflow-hidden shadow-lg border border-cygne-brown/10">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '400px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Les Suites du Cygne - 20-22 Rue des Boulangers, Colmar"
        />
      </div>
    );
  }