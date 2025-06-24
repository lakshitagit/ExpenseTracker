import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "../assets/styles/home.styles"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../constants/colors"
import { router, useRouter } from "expo-router"

const NoTransactionsFound = ()=>{
    const router = useRouter();
    return(
        <View style={styles.emptyState}>
            <Ionicons
            name="receipt-outline"
            size={60}
            color={COLORS.textLight}
            style={styles.emptyStateIcon}
            >
            </Ionicons>
            <Text style={styles.emptyStateTitle}>No transactions yet</Text>
            <Text style={styles.emptyStateText}>Start tracking your finance by adding your first transaction</Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={()=> router.push("/create")}>
                <Ionicons name="add-circle" size={18} color={COLORS.white}></Ionicons>
                <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NoTransactionsFound;