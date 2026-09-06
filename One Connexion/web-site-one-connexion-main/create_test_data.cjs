const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Clés Supabase introuvables dans le fichier .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("🚀 Lancement du script de création de données...");

  // 1. Ajouter un chauffeur "test"
  console.log("\n1️⃣ Ajout du chauffeur 'Test'...");
  const { data: driver, error: driverError } = await supabase
    .from('profiles')
    .insert({
      role: 'courier',
      is_online: true,
      details: {
        full_name: 'Chauffeur Test',
        email: 'test.driver@example.com',
        phone_number: '0600000000',
        vehicle_type: 'moto',
        vehicle_model: 'Yamaha MT-07',
        vehicle_plate: 'AA-123-AA'
      }
    })
    .select()
    .single();

  if (driverError) {
    console.error("❌ Erreur création chauffeur:", driverError.message);
  } else {
    console.log("✅ Chauffeur ajouté avec succès (ID:", driver.id, ")");
  }

  // 2. Trouver un client pour associer la commande
  console.log("\n2️⃣ Recherche d'un client...");
  const { data: client } = await supabase
    .from('profiles')
    .select('id')
    .eq('role', 'client')
    .limit(1)
    .single();

  const clientId = client ? client.id : null;
  if (!clientId) {
    console.log("⚠️ Aucun client trouvé. La commande sera créée sans client_id.");
  }

  // 3. Créer une commande de test
  console.log("\n3️⃣ Création de la commande...");
  const orderData = {
    client_id: clientId,
    pickup_address: "10 Rue de Rivoli",
    pickup_city: "Paris",
    pickup_postal_code: "75001",
    delivery_address: "20 Avenue des Champs-Élysées",
    delivery_city: "Paris",
    delivery_postal_code: "75008",
    vehicle_type: "moto",
    service_level: "normal",
    status: "pending_acceptance",
    price_ht: 15.50,
    scheduled_at: new Date().toISOString(),
    delivery_deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    package_type: "Pli",
    package_description: "Documents importants de test",
    weight: 1.5,
    pickup_name: "Expéditeur Test",
    delivery_name: "Destinataire Test"
  };

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single();

  if (orderError) {
    console.error("❌ Erreur création commande:", orderError.message);
  } else {
    console.log("✅ Commande créée avec succès (ID:", order.id, ")");
  }
}

main();
