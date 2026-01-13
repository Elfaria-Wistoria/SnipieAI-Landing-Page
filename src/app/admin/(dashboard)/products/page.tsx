import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Edit, Plus, Trash2, Package } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { revalidateProducts } from "@/app/actions/products";
import Image from "next/image";

export const revalidate = 0;

async function deleteProduct(formData: FormData) {
    'use server'
    const id = formData.get('id') as string;
    await supabase.from('products').delete().eq('id', id);
    await revalidateProducts();
}

export default async function AdminProductsPage() {
    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Package className="w-8 h-8" />
                    Products
                </h1>
                <Link href="/admin/products/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                    </Button>
                </Link>
            </div>

            <div className="border rounded-lg bg-background/50 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Colors</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!products?.length ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No products found. Create your first one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="w-10 h-10 relative rounded overflow-hidden bg-muted">
                                            {product.image_url && (
                                                <Image
                                                    src={product.image_url}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${product.color_from || 'from-gray-500'} ${product.color_to || 'to-gray-500'}`} />
                                            <span className="text-xs text-muted-foreground font-mono">
                                                {product.color_from?.replace('from-', '')}-{product.color_to?.replace('to-', '')}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {format(new Date(product.created_at), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end items-center gap-2">
                                            <Link href={`/admin/products/edit/${product.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <form action={deleteProduct}>
                                                <input type="hidden" name="id" value={product.id} />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    type="submit"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
