import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AVATAR, POSTS } from '@/data/images';

const PROFILE = {
  username: 'beaaliper',
  name: 'cocoa',
  note: 'Unpopular opinion...',
  role: 'Artist',
  posts: 9,
  followers: 165,
  following: 183,
  views30d: 648,
  music: { title: 'Space Cadet', artist: 'beabadoobee' },
  obsession: 'bea',
};

// views = shows the eye + number; pinned = pin icon; multi = multi-photo icon
const TILES = [
  { views: 676, pinned: true },
  { views: 2062, pinned: true },
  { views: 561, pinned: true },
  { multi: true },
  { multi: true },
  { multi: true },
  { multi: true },
  { multi: true },
  { multi: true },
];

const TABS = ['grid-outline', 'play-circle-outline', 'repeat-outline', 'person-circle-outline'] as const;

export default function ProfileScreen() {
  const [tab, setTab] = useState(0);

  return (
    <SafeAreaView style={s.screen} edges={['top']}>
      <View style={s.topBar}>
        <Ionicons name="add" size={34} color="#fff" />
        <View style={s.row}>
          <Text style={s.topUser}>{PROFILE.username}</Text>
          <Ionicons name="chevron-down" size={18} color="#fff" />
        </View>
        <View style={s.row}>
          <Ionicons name="at-circle-outline" size={28} color="#fff" />
          <Ionicons name="menu" size={32} color="#fff" style={{ marginLeft: 22 }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={s.header}>
          <View style={{ width: 96 }}>
            <View style={s.noteWrap}>
              <View style={s.note}>
                <Text style={s.noteText}>{PROFILE.note}</Text>
              </View>
            </View>
            <Image source={AVATAR} style={s.avatar} />
            <View style={s.plus}>
              <Ionicons name="add" size={16} color="#fff" />
            </View>
          </View>

          <View style={{ flex: 1, marginLeft: 22 }}>
            <View style={[s.row, { marginBottom: 10 }]}>
              <Text style={s.name}>{PROFILE.name}</Text>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#3d9bff" style={{ marginLeft: 6 }} />
            </View>
            <View style={s.stats}>
              <Stat n={PROFILE.posts} label="posts" />
              <Stat n={PROFILE.followers} label="followers" />
              <Stat n={PROFILE.following} label="following" />
            </View>
          </View>
        </View>

        <Text style={s.role}>{PROFILE.role}</Text>

        <View style={s.chips}>
          <View style={s.chip}>
            <Ionicons name="play-outline" size={18} color="#fff" />
            <Text style={s.chipText}>
              <Text style={s.bold}>{PROFILE.music.title}</Text>  {PROFILE.music.artist}
            </Text>
          </View>
          <View style={s.chip}>
            <Ionicons name="heart-outline" size={18} color="#fff" />
            <Text style={s.chipText}>
              <Text style={s.bold}>Current obsession:</Text>  {PROFILE.obsession}
            </Text>
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Your dashboard</Text>
          <View style={[s.row, { marginTop: 4, gap: 6 }]}>
            <Ionicons name="trending-up" size={16} color="#3ddc84" />
            <Text style={s.cardSub}>{PROFILE.views30d} views in the last 30 days.</Text>
          </View>
        </View>

        <View style={s.btnRow}>
          <Pressable style={s.btn}><Text style={s.btnText}>Edit profile</Text></Pressable>
          <Pressable style={s.btn}><Text style={s.btnText}>Share profile</Text></Pressable>
        </View>

        <View style={s.tabs}>
          {TABS.map((name, i) => (
            <Pressable key={name} style={[s.tab, tab === i && s.tabOn]} onPress={() => setTab(i)}>
              <Ionicons name={name} size={28} color={tab === i ? '#fff' : '#8e9399'} />
            </Pressable>
          ))}
        </View>

        {tab === 0 ? (
          <View style={s.grid}>
            {TILES.map((t: any, i) => (
              <View key={i} style={s.tile}>
                <Image source={POSTS[i]} style={s.tileImg} resizeMode="cover" />
                {t.pinned && <Ionicons name="pin" size={18} color="#fff" style={s.tr} />}
                {t.multi && <Ionicons name="copy" size={18} color="#fff" style={s.tr} />}
                {t.views != null && (
                  <View style={s.views}>
                    <Ionicons name="eye" size={16} color="#fff" />
                    <Text style={s.viewsText}>{t.views.toLocaleString()}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={s.empty}>
            <Ionicons name={TABS[tab]} size={48} color="#555a60" />
            <Text style={s.emptyText}>Nothing here yet</Text>
          </View>
        )}
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={s.nav}>
        <View style={s.navRow}>
          <Ionicons name="home" size={28} color="#fff" />
          <Ionicons name="play-circle-outline" size={30} color="#fff" />
          <View>
            <Ionicons name="paper-plane-outline" size={28} color="#fff" />
            <View style={s.badge}><Text style={s.badgeText}>4</Text></View>
          </View>
          <Ionicons name="search-outline" size={28} color="#fff" />
          <Image source={AVATAR} style={s.navAvatar} />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <View>
      <Text style={s.statN}>{n}</Text>
      <Text style={s.statL}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#121316' },
  row: { flexDirection: 'row', alignItems: 'center' },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 },
  topUser: { color: '#fff', fontSize: 22, fontWeight: '700', marginRight: 6 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 34 },
  noteWrap: { position: 'absolute', top: -34, left: 0, zIndex: 2 },
  note: { backgroundColor: '#2b2d31', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8, maxWidth: 110 },
  noteText: { color: '#c3c7cc', fontSize: 13, textAlign: 'center' },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: '#2a2d32' },
  plus: { position: 'absolute', right: 0, bottom: 2, width: 26, height: 26, borderRadius: 13, backgroundColor: '#3d7eff', borderWidth: 2, borderColor: '#121316', alignItems: 'center', justifyContent: 'center' },
  name: { color: '#fff', fontSize: 20, fontWeight: '600' },
  stats: { flexDirection: 'row', justifyContent: 'space-between', paddingRight: 6 },
  statN: { color: '#fff', fontSize: 20, fontWeight: '700' },
  statL: { color: '#fff', fontSize: 16 },
  role: { color: '#9aa0a6', fontSize: 16, paddingHorizontal: 16, marginTop: 10 },
  chips: { paddingHorizontal: 16, marginTop: 10, gap: 8, alignItems: 'flex-start' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#3a3d42', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 },
  chipText: { color: '#fff', fontSize: 16 },
  bold: { fontWeight: '700' },
  card: { backgroundColor: '#25272b', borderRadius: 14, marginHorizontal: 16, marginTop: 16, padding: 16 },
  cardTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  cardSub: { color: '#a8adb3', fontSize: 15 },
  btnRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: 14 },
  btn: { flex: 1, backgroundColor: '#25272b', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  tabs: { flexDirection: 'row', marginTop: 16 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabOn: { borderBottomColor: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2, marginTop: 2 },
  tile: { width: '32.8%', aspectRatio: 0.75, backgroundColor: '#2a2d32', overflow: 'hidden' },
  tileImg: { width: '100%', height: '100%' },
  tr: { position: 'absolute', top: 8, right: 8 },
  views: { position: 'absolute', left: 8, bottom: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewsText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 10 },
  emptyText: { color: '#8e9399', fontSize: 16 },
  nav: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#121316' },
  navRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12 },
  navAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2a2d32' },
  badge: { position: 'absolute', top: -6, right: -8, backgroundColor: '#ff3b30', borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
