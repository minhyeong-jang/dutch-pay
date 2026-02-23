import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="bg-white">
      <Stack.Screen options={{ title: "더치페이" }} />
      <View className="h-full w-full items-center justify-center p-4">
        <Text className="pb-2 text-center text-4xl font-bold">
          더치페이 계산기
        </Text>
        <Text className="text-center text-lg text-gray-600">
          토스로 못 하는 복잡한 정산, 1분 만에
        </Text>
      </View>
    </SafeAreaView>
  );
}
