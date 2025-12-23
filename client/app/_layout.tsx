import NoteProvider from "@/context/NotesContext";
import { Stack } from "expo-router";
import {SQLiteDatabase, SQLiteProvider} from "expo-sqlite"

export default function RootLayout() {
    return (
      <SQLiteProvider
          databaseName="user_notes.db"
          onInit={migrateDbIfNeeded}
      >
      <NoteProvider>
        <Stack>
          {/* <Stack.Screen name="index" options={{headerShown:false}}/> */}
          <Stack.Screen name="index" options={{headerShown:false}}/>
          <Stack.Screen name="favorites" options={{headerShown:false}}/>
          <Stack.Screen name="folders" options={{headerShown:false}}/>
          <Stack.Screen name="search" options={{headerShown:false}}/>
          <Stack.Screen name="create" options={{headerShown:false}}/>
          <Stack.Screen name="edit/[id]" options={{headerShown:false}}/>
          <Stack.Screen name="manage/[id]" options={{ headerShown: false }} />
        </Stack>
        </NoteProvider>
      </SQLiteProvider>
    )
}

async function migrateDbIfNeeded(db:SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let result = await db.getFirstAsync<{ user_version: number } | null>("PRAGMA user_version")
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    console.log("No migration needed, DB version: ", currentDbVersion)
    return
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, title TEXT, content TEXT, favorite boolean, updatedAT TEXT, createdAt TEXT);
    `);

    console.log("Initial migration applied, DB version: ", DATABASE_VERSION)

    currentDbVersion = 1
  } else {
    console.log("DB version: ", currentDbVersion)
  }


  
}